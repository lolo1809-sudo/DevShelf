//Conectar la aplicación de React con la base de datos de Supabase

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ipxqproooyexownvwxjg.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__qrzt0_WE32rvbYY7PR65Q_qQOQHsOK";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
