const schemaExtras = `
scalar DateTime
enum DgraphIndex {
	int
	float
	bool
	hash
	exact
	term
	fulltext
	trigram
	regexp
	year
	month
	day
	hour
}
input AuthRule {
	and: [AuthRule]
	or: [AuthRule]
	not: AuthRule
	rule: String
}
enum HTTPMethod {
	GET
	POST
	PUT
	PATCH
	DELETE
}
enum Mode {
	BATCH
	SINGLE
}
input CustomHTTP {
	url: String!
	method: HTTPMethod!
	body: String
	graphql: String
	mode: Mode
	forwardHeaders: [String!]
	secretHeaders: [String!]
	introspectionHeaders: [String!]
	skipIntrospection: Boolean
}
directive @hasInverse(field: String!) on FIELD_DEFINITION
directive @search(by: [DgraphIndex!]) on FIELD_DEFINITION
directive @dgraph(type: String, pred: String) on OBJECT | INTERFACE | FIELD_DEFINITION
directive @id on FIELD_DEFINITION
directive @withSubscription on OBJECT | INTERFACE
directive @secret(field: String!, pred: String) on OBJECT | INTERFACE
directive @auth(
	query: AuthRule,
	add: AuthRule,
	update: AuthRule,
	delete:AuthRule) on OBJECT
directive @custom(http: CustomHTTP) on FIELD_DEFINITION
directive @remote on OBJECT | INTERFACE
directive @cascade on FIELD
input IntFilter {
	eq: Int
	le: Int
	lt: Int
	ge: Int
	gt: Int
}
input FloatFilter {
	eq: Float
	le: Float
	lt: Float
	ge: Float
	gt: Float
}
input DateTimeFilter {
	eq: DateTime
	le: DateTime
	lt: DateTime
	ge: DateTime
	gt: DateTime
}
input StringTermFilter {
	allofterms: String
	anyofterms: String
}
input StringRegExpFilter {
	regexp: String
}
input StringFullTextFilter {
	alloftext: String
	anyoftext: String
}
input StringExactFilter {
	eq: String
	le: String
	lt: String
	ge: String
	gt: String
}
input StringHashFilter {
	eq: String
}`

export default schemaExtras
