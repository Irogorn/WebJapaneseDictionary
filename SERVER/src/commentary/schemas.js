import S from "fluent-json-schema";

export const Commentary = S.object()
    .title("Commentary")
    .description("definition about Commentary")
    .prop("commentaryId", S.integer())
    .prop("wordId", S.integer())
    .prop("userId", S.integer())
    .prop("userName",S.string())
    .prop("commentary", S.string())
    .prop("datePosted",S.string().format('date-time'))
    .prop("reply",S.integer())
    .prop("user_name_reply",S.string())
    .prop("report",S.integer())

export const ArrayCommentary = S.array().additionalItems(Commentary);

export const NewCommentary = S.object()
    .title("New commentary")
    .description("definition about a new commentary")
    .prop("wordId", S.integer())
    .prop("commentary", S.string())
    .prop("reply",S.integer())
    .prop("user_name_reply",S.string());