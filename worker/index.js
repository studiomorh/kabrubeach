const COOKIE_NAME = 'kb_session'
const SESSION_DAYS = 7
const PBKDF2_ITERATIONS = 5000
const MENU_IDS = new Set([
  'almoco',
  'jantar',
  'manha',
  'drinks',
  'vinhos',
  'chefstable',
])
const LANGUAGES = new Set(['PT', 'EN', 'ES'])

const json = (data, status = 200, headers = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      ...headers,
    },
  })

const bytesToHex = (buffer) =>
  [...new Uint8Array(buffer)].map((byte) => byte.toString(16).padStart(2, '0')).join('')

const hexToBytes = (hex) => {
  const bytes = new Uint8Array(hex.length / 2)
  for (let i = 0; i < bytes.length; i += 1) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16)
  }
  return bytes
}

const randomHex = (size = 32) => {
  const bytes = new Uint8Array(size)
  crypto.getRandomValues(bytes)
  return bytesToHex(bytes)
}

const sha256Hex = async (value) => {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest('SHA-256', encoded)
  return bytesToHex(digest)
}

const hashPassword = async (password, saltHex) => {
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    'PBKDF2',
    false,
    ['deriveBits']
  )
  const bits = await crypto.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: hexToBytes(saltHex),
      iterations: PBKDF2_ITERATIONS,
      hash: 'SHA-256',
    },
    keyMaterial,
    256
  )
  return bytesToHex(bits)
}

const safeEqual = (left, right) => {
  if (typeof left !== 'string' || typeof right !== 'string' || left.length !== right.length) {
    return false
  }
  let diff = 0
  for (let i = 0; i < left.length; i += 1) {
    diff |= left.charCodeAt(i) ^ right.charCodeAt(i)
  }
  return diff === 0
}

const readCookie = (request, name) => {
  const header = request.headers.get('Cookie') || ''
  for (const part of header.split(';')) {
    const [key, ...rest] = part.trim().split('=')
    if (key === name) return rest.join('=')
  }
  return null
}

const cookieHeader = (token, request, clear = false) => {
  const secure = new URL(request.url).protocol === 'https:'
  const parts = [
    `${COOKIE_NAME}=${clear ? '' : token}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
  ]
  if (clear) parts.push('Max-Age=0')
  else parts.push(`Max-Age=${SESSION_DAYS * 24 * 60 * 60}`)
  if (secure) parts.push('Secure')
  return parts.join('; ')
}

let schemaReady = false

const ensureSchema = async (db) => {
  if (schemaReady) return
  await db.batch([
    db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT NOT NULL UNIQUE COLLATE NOCASE,
        password_hash TEXT NOT NULL,
        password_salt TEXT NOT NULL,
        created_at TEXT NOT NULL
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        token_hash TEXT NOT NULL UNIQUE,
        expires_at TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `),
    db.prepare(`
      CREATE TABLE IF NOT EXISTS menu_versions (
        id TEXT PRIMARY KEY,
        menu_id TEXT NOT NULL,
        language TEXT NOT NULL,
        payload TEXT NOT NULL,
        created_by TEXT,
        created_at TEXT NOT NULL,
        FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
      )
    `),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token_hash)'),
    db.prepare('CREATE INDEX IF NOT EXISTS idx_sessions_expires ON sessions(expires_at)'),
    db.prepare(`
      CREATE INDEX IF NOT EXISTS idx_versions_menu_lang_created
        ON menu_versions(menu_id, language, created_at DESC)
    `),
  ])
  schemaReady = true
}

const ensureAdmin = async (env) => {
  const existing = await env.DB.prepare('SELECT id FROM users LIMIT 1').first()
  if (existing) return

  const username = env.ADMIN_USERNAME
  const password = env.ADMIN_PASSWORD
  if (!username || !password) return

  const salt = randomHex(16)
  const passwordHash = await hashPassword(password, salt)
  await env.DB.prepare(
    'INSERT INTO users (id, username, password_hash, password_salt, created_at) VALUES (?, ?, ?, ?, ?)'
  )
    .bind(crypto.randomUUID(), username, passwordHash, salt, new Date().toISOString())
    .run()
}

const getSessionUser = async (request, env) => {
  const token = readCookie(request, COOKIE_NAME)
  if (!token) return null

  const tokenHash = await sha256Hex(token)
  const row = await env.DB.prepare(
    `
      SELECT users.id, users.username, sessions.expires_at, sessions.id AS session_id
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      WHERE sessions.token_hash = ?
      LIMIT 1
    `
  )
    .bind(tokenHash)
    .first()

  if (!row) return null
  if (new Date(row.expires_at).getTime() <= Date.now()) {
    await env.DB.prepare('DELETE FROM sessions WHERE id = ?').bind(row.session_id).run()
    return null
  }

  return { id: row.id, username: row.username }
}

const requireUser = async (request, env) => {
  const user = await getSessionUser(request, env)
  if (!user) return { error: json({ error: 'Não autenticado.' }, 401) }
  return { user }
}

const readJson = async (request) => {
  try {
    return { body: await request.json() }
  } catch {
    return { error: json({ error: 'JSON inválido.' }, 400) }
  }
}

const handleLogin = async (request, env) => {
  const parsed = await readJson(request)
  if (parsed.error) return parsed.error

  const username = String(parsed.body?.username || '').trim()
  const password = String(parsed.body?.password || '')
  if (!username || !password) {
    return json({ error: 'Informe usuário e senha.' }, 400)
  }

  const user = await env.DB.prepare(
    'SELECT id, username, password_hash, password_salt FROM users WHERE username = ? COLLATE NOCASE LIMIT 1'
  )
    .bind(username)
    .first()

  if (!user) return json({ error: 'Usuário ou senha inválidos.' }, 401)

  const passwordHash = await hashPassword(password, user.password_salt)
  if (!safeEqual(passwordHash, user.password_hash)) {
    return json({ error: 'Usuário ou senha inválidos.' }, 401)
  }

  const token = randomHex(32)
  const tokenHash = await sha256Hex(token)
  const now = new Date()
  const expires = new Date(now.getTime() + SESSION_DAYS * 24 * 60 * 60 * 1000)

  await env.DB.prepare(
    'INSERT INTO sessions (id, user_id, token_hash, expires_at, created_at) VALUES (?, ?, ?, ?, ?)'
  )
    .bind(crypto.randomUUID(), user.id, tokenHash, expires.toISOString(), now.toISOString())
    .run()

  return json(
    { user: { id: user.id, username: user.username } },
    200,
    { 'Set-Cookie': cookieHeader(token, request) }
  )
}

const handleLogout = async (request, env) => {
  const token = readCookie(request, COOKIE_NAME)
  if (token) {
    const tokenHash = await sha256Hex(token)
    await env.DB.prepare('DELETE FROM sessions WHERE token_hash = ?').bind(tokenHash).run()
  }
  return json({ ok: true }, 200, { 'Set-Cookie': cookieHeader('', request, true) })
}

const listVersions = async (url, env) => {
  const menuId = url.searchParams.get('menu') || ''
  const language = (url.searchParams.get('language') || 'PT').toUpperCase()
  if (!MENU_IDS.has(menuId) || !LANGUAGES.has(language)) {
    return json({ error: 'Menu ou idioma inválido.' }, 400)
  }

  const { results } = await env.DB.prepare(
    `
      SELECT id, menu_id, language, created_at, created_by
      FROM menu_versions
      WHERE menu_id = ? AND language = ?
      ORDER BY created_at DESC
      LIMIT 100
    `
  )
    .bind(menuId, language)
    .all()

  return json({ versions: results || [] })
}

const getVersion = async (id, env) => {
  const row = await env.DB.prepare(
    'SELECT id, menu_id, language, payload, created_at, created_by FROM menu_versions WHERE id = ? LIMIT 1'
  )
    .bind(id)
    .first()

  if (!row) return json({ error: 'Versão não encontrada.' }, 404)

  return json({
    ...row,
    payload: JSON.parse(row.payload),
  })
}

const getCurrent = async (menuId, url, env) => {
  const language = (url.searchParams.get('language') || 'PT').toUpperCase()
  if (!MENU_IDS.has(menuId) || !LANGUAGES.has(language)) {
    return json({ error: 'Menu ou idioma inválido.' }, 400)
  }

  const row = await env.DB.prepare(
    `
      SELECT id, menu_id, language, payload, created_at, created_by
      FROM menu_versions
      WHERE menu_id = ? AND language = ?
      ORDER BY created_at DESC
      LIMIT 1
    `
  )
    .bind(menuId, language)
    .first()

  if (!row) return json({ version: null })

  return json({
    version: {
      ...row,
      payload: JSON.parse(row.payload),
    },
  })
}

const saveVersion = async (request, env, user) => {
  const parsed = await readJson(request)
  if (parsed.error) return parsed.error

  const menuId = String(parsed.body?.menu || '')
  const language = String(parsed.body?.language || 'PT').toUpperCase()
  const payload = parsed.body?.payload
  if (!MENU_IDS.has(menuId) || !LANGUAGES.has(language) || !payload || typeof payload !== 'object') {
    return json({ error: 'Dados da versão inválidos.' }, 400)
  }

  const serialized = JSON.stringify(payload)
  if (serialized.length > 1_000_000) {
    return json({ error: 'Cardápio grande demais para salvar.' }, 413)
  }

  const id = crypto.randomUUID()
  const createdAt = new Date().toISOString()
  await env.DB.prepare(
    `
      INSERT INTO menu_versions (id, menu_id, language, payload, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `
  )
    .bind(id, menuId, language, serialized, user.id, createdAt)
    .run()

  return json(
    {
      version: {
        id,
        menu_id: menuId,
        language,
        created_at: createdAt,
        created_by: user.id,
      },
    },
    201
  )
}

const handleApi = async (request, env) => {
  await ensureSchema(env.DB)
  await ensureAdmin(env)

  const url = new URL(request.url)
  const path = url.pathname.replace(/\/$/, '') || '/'

  if (request.method === 'POST' && path === '/api/login') return handleLogin(request, env)
  if (request.method === 'POST' && path === '/api/logout') return handleLogout(request, env)

  if (request.method === 'GET' && path === '/api/me') {
    const user = await getSessionUser(request, env)
    if (!user) return json({ error: 'Não autenticado.' }, 401)
    return json({ user })
  }

  const auth = await requireUser(request, env)
  if (auth.error) return auth.error

  if (request.method === 'GET' && path === '/api/versions') return listVersions(url, env)
  if (request.method === 'POST' && path === '/api/versions') {
    return saveVersion(request, env, auth.user)
  }

  const versionMatch = path.match(/^\/api\/versions\/([^/]+)$/)
  if (request.method === 'GET' && versionMatch) return getVersion(versionMatch[1], env)

  const currentMatch = path.match(/^\/api\/menus\/([^/]+)\/current$/)
  if (request.method === 'GET' && currentMatch) {
    return getCurrent(currentMatch[1], url, env)
  }

  return json({ error: 'Rota não encontrada.' }, 404)
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    if (url.pathname.startsWith('/api/')) {
      try {
        return await handleApi(request, env)
      } catch (error) {
        console.error(error)
        return json({ error: 'Erro interno.' }, 500)
      }
    }

    if (env.ASSETS) return env.ASSETS.fetch(request)
    return new Response('Not found', { status: 404 })
  },
}
