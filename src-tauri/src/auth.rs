// use chrono::{DateTime, Utc};

// #[derive(serde::Deserialize)]
// pub struct LoginResponse {
//   access_token: String,
//   refresh_token: String,
//   expires: String
// }

#[tauri::command]
pub async fn fetch_auth_tokens (
  username: String,
  password: String
) -> Result<serde_json::Value, String> {
  let client = reqwest::Client::new();
  let response = client.post("https://api.wuolah.com/login")
    .header("Content-Type", "application/json")
    .json(
      &serde_json::json!({
        "account": username,
        "password": password
      })
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

// #[tauri::command]
// pub fn is_token_valid (
//   tokens: LoginResponse
// ) -> Result<serde_json::Value, serde_json::Value> {
//   let expires = DateTime::parse_from_rfc3339(&tokens.expires)
//     .expect("Error parsing date")
//     .timestamp();

//   let now = Utc::now().timestamp();

//   if expires < now {
//     Ok(
//       serde_json::json!({
//         "expired": false
//       })
//     )
//   } else {
//     Err(
//       serde_json::json!({
//         "expired": true
//       })
//     )
//   }
// }
