// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod auth;
mod file;

fn main () {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      auth::fetch_auth_tokens,
      file::get_config,
      file::set_config
      // auth::is_token_valid
    ])
    .run(tauri::generate_context!())
    .expect("Error on execution.");
}
