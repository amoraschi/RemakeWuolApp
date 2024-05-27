// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]
// use std::collections::HashMap;
// use std::sync::{Arc, Mutex};

mod auth;
mod file;
mod storage;

// type SharedMap = Arc<Mutex<HashMap<String, String>>>;

fn main () {
  // let shared_map: SharedMap = Arc::new(Mutex::new(HashMap::new()));

  tauri::Builder::default()
    // .manage(shared_map)
    .invoke_handler(tauri::generate_handler![
      auth::fetch_auth_tokens,
      file::get_config,
      file::set_config,
      // storage::get_local,
      // storage::set_local,
    ])
    .run(tauri::generate_context!())
    .expect("Error on execution.");
}
