#[macro_use]
extern crate rocket;
use sqlx::postgres::PgPoolOptions;

mod handlers;
mod models;

#[rocket::main]
async fn main() -> Result<(), rocket::Error> {
    let pool = PgPoolOptions::new()
        .connect("postgres://postgres:password@localhost/blog")
        .await
        .expect("Failed to build db connection");

    sqlx::migrate!("./migrations")
        .run(&pool)
        .await
        .expect("Failed to apply migrations");

    let _rocket = rocket::build()
        .manage(pool)
        .mount(
            "/api/",
            routes![handlers::index::index, handlers::index::hello],
        )
        .mount(
            "/api/feature",
            routes![
                handlers::feature_request_handler::get_all,
                handlers::feature_request_handler::create
            ],
        )
        .launch()
        .await?;

    Ok(())
}
