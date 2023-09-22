import S from 'fluent-json-schema';

export const NewUser = S.object()
    .title('NewUser')
    .description('Définie un nouvelle uitlisateur')
    .prop('userName',S.string().required())
    .prop('firstName',S.string())
    .prop('lastName',S.string())
    .prop('eMail', S.string().required())
    .prop('passWord', S.string().required());

export const User = NewUser
.prop('createdDate',S.string().format('date-time').required());

export const Credential = S.object()
    .title('Credential')
    .description('Contient les informations nescessaire pour se connécter')
    .prop('eMail', S.string().required())
    .prop('passWord', S.string().required());

export const Token = S.object().prop('token', S.string().required());

export const UserUpdate =  S.object()
                        .title('UpdatedUser')
                        .description('Définie une mise à jour de l\'utilisateur')
                        .prop('userName',S.string().required())
                        .prop('firstName',S.string())
                        .prop('lastName',S.string())
                        .prop('eMail', S.string().required())
                        .prop('passWord', S.string());
