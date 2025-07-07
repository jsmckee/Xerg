use async_graphql::{Context, Object, Result, SimpleObject};
use async_graphql::futures_util::StreamExt;
use crate::db::MongoDb;
use mongodb::bson::{doc};
// use chrono::{DateTime, Utc};

#[derive(SimpleObject)]
pub struct TableData {
    id: String,
    raw: String,
    // encoding: String,
    // read: String,
     title: String,
    // links: String
}

#[derive(Default)]
pub struct TableDataQuery;

#[Object]
impl TableDataQuery {
    async fn get_page_by_title(&self, ctx: &Context<'_>, title: String) -> Result<TableData> {
        let db = ctx.data::<MongoDb>()?.lock().await;
        let collection: mongodb::Collection<mongodb::bson::Document> = db.collection("pages");
        let filter = doc! { "title": &title };
        let page_doc = collection.find_one(filter, None).await?;
        
        if let Some(page_doc) = page_doc {
            let page = TableData {
                id: page_doc.get("_id").unwrap().as_object_id().unwrap().to_string(),
                raw: page_doc.get_str("raw").unwrap().to_string(),
                // encoding: page_doc.get_str("encoding").unwrap().to_string(),
                 title: page_doc.get_str("title").unwrap().to_string(),
            };
            Ok(page)
        } else {
            Err("Page not found".into())
        }
    }

    async fn get_page_by_id(&self, ctx: &Context<'_>, id: String) -> Result<TableData> {
        let db = ctx.data::<MongoDb>()?.lock().await;
        let collection: mongodb::Collection<mongodb::bson::Document> = db.collection("pages");
        let filter = doc! { "_id": &id };
        let page_doc = collection.find_one(filter, None).await?;
        
        if let Some(page_doc) = page_doc {
            let page = TableData {
                id: page_doc.get("_id").unwrap().as_object_id().unwrap().to_string(),
                raw: page_doc.get_str("raw").unwrap().to_string(),
                // encoding: page_doc.get_str("encoding").unwrap().to_string(),
                 title: page_doc.get_str("title").unwrap().to_string(),
            };
            Ok(page)
        } else {
            Err("Page not found".into())
        }
    }

    async fn get_pages(&self, ctx: &Context<'_>, skip: u64, take: i64) -> Result<Vec<TableData>> {
        let db = ctx.data::<MongoDb>()?.lock().await;
        let collection: mongodb::Collection<mongodb::bson::Document> = db.collection("pages");
        let filter = doc! { };
        let mut cursor = collection.find(filter, None).await?;
        
        let mut pages = Vec::new();
        while let Some(page_doc) = cursor.next().await {
            let page_doc = page_doc?;
            let page = TableData {
                id: page_doc.get("_id").unwrap().as_object_id().unwrap().to_string(),
                raw: page_doc.get_str("raw").unwrap().to_string(),
                // encoding: page_doc.get_str("encoding").unwrap().to_string(),
                 title: page_doc.get_str("title").unwrap().to_string(),    
            };
            pages.push(page);
        }
        
        Ok(pages)
    }
}
