// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use reqwest;

fn main () {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![fetch_auth_tokens])
    .run(tauri::generate_context!())
    .expect("Error on execution.");
}

#[tauri::command]
async fn fetch_auth_tokens (
  username: String,
  password: String
) -> Result<serde_json::Value, String> {
  let client = reqwest::Client::new();
  let response = client.post("https://api.wuolah.com/login")
    .body(
      serde_json::json!({
        "account": username,
        "password": password
      })
      .to_string()
    )
    .send()
    .await
    .map_err(|e| format!("Error sending request: {}", e))?;

  let status = response.status();
  if !status.is_success() {
    let body = response
      .text()
      .await
      .map_err(|e| format!("Error reading response: {}", e))?;

    return Err(body);
  }

  let body = response
    .text()
    .await
    .map_err(|e| format!("Error reading response: {}", e))?;

  let json: serde_json::Value = serde_json::from_str(&body)
    .map_err(|e| format!("Error parsing JSON: {}", e))?;

  Ok(json)
}
