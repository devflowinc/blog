#[get("/")]
pub fn index() -> &'static str {
    "Hello, world!"
}

#[get("/hello/<name>")]
pub fn hello(name: &str) -> String {
    format!("Hello, {}!", name)
}
