use sqlx::{
    types::{chrono},
    Pool, Postgres,
};
use rocket::serde::{Serialize, Deserialize};

#[derive(Default, Debug, Serialize, Deserialize)]
#[serde(crate = "rocket::serde")]
pub struct FeatureRequest {
    pub id: uuid::Uuid,
    pub title: String,
    pub content: String,
    pub likes: i32,
    pub updated_at: chrono::NaiveDateTime,
    pub created_at: chrono::NaiveDateTime,
}

impl FeatureRequest {

    pub fn new(title: String, content: String) -> Self {
        Self {
            id: uuid::Uuid::new_v4(),
            title,
            content,
            likes: 0,
            updated_at: chrono::Utc::now().naive_utc(),
            created_at: chrono::Utc::now().naive_utc(),
        }
    }

    pub async fn find_by_id(
        id: uuid::Uuid,
        pool: &Pool<Postgres>,
    ) -> Result<FeatureRequest, sqlx::Error> {
        sqlx::query_as!(
            FeatureRequest,
            "SELECT * FROM feature_requests WHERE id = $1",
            id
        )
        .fetch_one(&*pool)
        .await
    }

    pub async fn get_all(pool: &Pool<Postgres>) -> Result<Vec<FeatureRequest>, sqlx::Error> {
        sqlx::query_as!(FeatureRequest, "SELECT * FROM feature_requests")
            .fetch_all(&*pool)
            .await
    }

    pub async fn create(&self, pool: &Pool<Postgres>) -> Result<(), sqlx::Error> {
        sqlx::query!("INSERT INTO feature_requests (id, title, content, likes, updated_at, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
                    self.id, self.title, self.content, self.likes, self.updated_at, self.created_at)
            .fetch_one(&*pool)
            .await?;

        Ok(())
    }
}
