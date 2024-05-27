// use std::collections::HashMap;
// use std::sync::{Arc, Mutex};

// type SharedMap = Arc<Mutex<HashMap<String, String>>>;

// #[tauri::command]
// pub fn get_local (state: tauri::State<SharedMap>, key: String) -> Option<String> {
//   let map = state.lock().unwrap();
//   map.get(&key).cloned()
// }

// #[tauri::command]
// pub fn set_local (state: tauri::State<SharedMap>, key: String, value: String) {
//   let mut map = state.lock().unwrap();
//   map.insert(key, value);
// }
