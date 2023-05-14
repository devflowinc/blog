use crate::models::feature_request::FeatureRequest;
use rocket::State;
use rocket::serde::json::Json;
use sqlx::{Pool, Postgres};


#[get("/")]
pub async fn get_all(pool: &State<Pool<Postgres>>) -> Json<FeatureRequest> {
    let res = FeatureRequest::get_all(pool).await;
    Json(res.unwrap())
}

#[post("/")]
pub async fn create(pool: &State<Pool<Postgres>>) {
    let request = FeatureRequest::new("title".to_string(), "content".to_string());

    let res = request.create(&pool).await;
    res.map_err(|e| {
        println!("Error creating feature request: {:?}", e);
        e
    });
}
