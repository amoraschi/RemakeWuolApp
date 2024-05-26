
use std::fs;
use std::path::Path;

#[tauri::command]
pub async fn get_config (app_handle: tauri::AppHandle) -> Result<serde_json::Value, String> {
  let dir_path = app_handle
    .path_resolver()
    .app_local_data_dir()
    .ok_or_else(|| "Error getting app local data dir".to_string())?;

  let config_path = Path::new(&dir_path).join("wuolapp.json");
  // println!("Config path: {:?}", config_path);

  if !config_path.exists() {
    set_config(app_handle, serde_json::json!({})).await?;
  }

  let config = fs::read_to_string(&config_path)
    .map_err(|e| format!("Error reading config file: {}", e))?;

  let json: serde_json::Value = serde_json::from_str(&config)
    .map_err(|e| format!("Error parsing JSON: {}", e))?;

  Ok(json)
}

#[tauri::command]
pub async fn set_config (app_handle: tauri::AppHandle, config: serde_json::Value) -> Result<(), String> {
  let dir_path = app_handle
    .path_resolver()
    .app_local_data_dir()
    .ok_or_else(|| "Error getting app local data dir".to_string())?;

  let config_path = Path::new(&dir_path).join("wuolapp.json");
  // println!("Config path: {:?}", config_path);

  let config_str = serde_json::to_string(&config)
    .map_err(|e| format!("Error serializing JSON: {}", e))?;

  fs::write(&config_path, config_str)
    .map_err(|e| format!("Error writing config file: {}", e))?;

  Ok(())
}
