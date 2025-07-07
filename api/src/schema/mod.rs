use async_graphql::{Schema, SchemaBuilder, MergedObject};
use crate::schema::tabledata::TableDataQuery;

pub mod tabledata;

#[derive(MergedObject, Default)]
pub struct QueryRoot(TableDataQuery);

pub type AppSchema = Schema<QueryRoot, async_graphql::EmptyMutation, async_graphql::EmptySubscription>;

pub fn create_schema() -> SchemaBuilder<QueryRoot, async_graphql::EmptyMutation, async_graphql::EmptySubscription> {
    Schema::build(QueryRoot::default(), async_graphql::EmptyMutation, async_graphql::EmptySubscription)
}