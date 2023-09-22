import { DataTypes } from "sequelize";

export default class BaseModel {
    constructor(table) {
        this.table = table;
        this.User = this.table.define('User', {
            // Model attributes are defined here
            userId: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            userName: {
              type: DataTypes.STRING,
              allowNull: false
            },
            firstName: {
              type: DataTypes.STRING,
              allowNull: false
            },
            lastName: {
              type: DataTypes.STRING,
              allowNull: false
            },
            eMail: {
              type: DataTypes.STRING,
              allowNull: false
            },
            passWord: {
              type: DataTypes.STRING,
              allowNull: false
            },
            createdDate: {
              type: DataTypes.DATE,
              allowNull: false
            },
            newRequestedPasswordToken: {
              type: DataTypes.STRING,
              allowNull: true
            } ,
            expirationDateNRPT: {
              type: DataTypes.DATE,
              allowNull: true
            },
            lastLogin: {
              type: DataTypes.DATE,
              allowNull: false
            },
          }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
          });

          this.Words = this.table.define('Words', {
            // Model attributes are defined here
            _id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
            },
            jp_romaji: {
            type: DataTypes.STRING,
            allowNull: false
            },
            jp_hiragana: {
            type: DataTypes.STRING,
            allowNull: false
            },
            jp_katakana: {
            type: DataTypes.STRING,
            allowNull: false
            },
            jp_kanji: {
            type: DataTypes.STRING,
            allowNull: false
            },
            nb_ro: {
            type: DataTypes.STRING,
            allowNull: false
            },
            nb_hi: {
            type: DataTypes.STRING,
            allowNull: false
            },
            type: {
            type: DataTypes.STRING,
            allowNull: false
            },
            states: {
            type: DataTypes.STRING,
            allowNull: false
            },
            filters: {
            type: DataTypes.STRING,
            allowNull: false
            },
        }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
        });
  
        this.WordsFR = this.table.define('WordsFR', {
            // Model attributes are defined here
            _id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
            },
            idWord: {
              type: DataTypes.INTEGER,
              autoIncrement: false,
              allowNull: false,
              primaryKey: true
              },
            french: {
            type: DataTypes.STRING,
            allowNull: false
            },
            jp_definition: {
              type: DataTypes.STRING,
              allowNull: false
              },
            jp_definition_ro: {
              type: DataTypes.STRING,
              allowNull: false
              },
            tense: {
              type: DataTypes.STRING,
              allowNull: false
              },
            fr_explication: {
            type: DataTypes.STRING,
            allowNull: false
            },
            fr_definition: {
            type: DataTypes.STRING,
            allowNull: false
            },
            blue_word: {
            type: DataTypes.STRING,
            allowNull: false
            },
        }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
        });

        this.Words.hasMany(this.WordsFR,{foreignKey: "idWord"});
        this.WordsFR.belongsTo(this.Words,{foreignKey: "_id"});

        this.Kanjis = this.table.define('Kanjis', {
            // Model attributes are defined here
            _id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            jlpt: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            kanji: {
              type: DataTypes.STRING,
              allowNull: false
            },
            nb_strokes: {
              type: DataTypes.INTEGER,
              allowNull: false
            },
            on: {
              type: DataTypes.STRING,
              allowNull: false
            },
            on_ka: {
              type: DataTypes.STRING,
              allowNull: false
            },
            on_ro: {
              type: DataTypes.STRING,
              allowNull: false
            },
            kun: {
              type: DataTypes.STRING,
              allowNull: false
            },
            kun_ro: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_ro: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on_ka: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on_ro: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_2: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_ro_2: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on_2: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on_ka_2: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on_ro_2: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_3: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_ro_3: {
              type: DataTypes.STRING,
              allowNull: false
            },
          }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
          });
          
          this.KanjisFR = this.table.define('KanjisFR', {
            // Model attributes are defined here
            _id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true
            },
            on_fr: {
              type: DataTypes.STRING,
              allowNull: false
            },
            kun_fr: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_fr: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on_fr: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_fr_2: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_on_fr_2: {
              type: DataTypes.STRING,
              allowNull: false
            },
            s_kun_fr_3: {
              type: DataTypes.STRING,
              allowNull: false
            },
          }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
          });

          this.Kanjis.hasOne(this.KanjisFR,{foreignKey: "_id"});
          this.KanjisFR.belongsTo(this.Kanjis,{foreignKey: "_id"});

          this.FormVerb = this.table.define('FormVerb', {
            // Model attributes are defined here
            _id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            for_pr: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_pr_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pr: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pr_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            pa_hi: {
              type: DataTypes.STRING,
              allowNull: false
            },
            n_pr: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_pr_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            te: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            te_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_te: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_te_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_potentiel: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_potentiel_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            potentiel: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            potentiel_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conjectural_for: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conjectural_for_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conjectural: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conjectural_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            imperative: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            imperative_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            causative: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            causative_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            volutive: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            volutive_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            obligation: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            obligation_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_too: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_too_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_too_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_too_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            stem: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            stem_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            dan: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_passif: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_passif_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            passif: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            passif_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_passif_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_passif_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            }
          }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
          });

          this.FormAdj = this.table.define('FormAdj', {
            // Model attributes are defined here
            _id: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            for_pr: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_pr_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pr: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pr_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            for_n_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            pa_hi: {
              type: DataTypes.STRING,
              allowNull: false
            },
            n_pr: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_pr_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            te: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            te_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_te: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            n_te_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            intentionnelle: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            intentionnelle_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel_pa: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            conditionnel_pa_hi: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            type: {
              type: DataTypes.STRING,
              allowNull: false,
            },
          }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
          });

          this.Commentary = this.table.define('Commentary',{
            commentaryId: {
              type: DataTypes.INTEGER,
              autoIncrement: true,
              allowNull: false,
              primaryKey: true,
            },
            wordId: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
            userId: {
              type: DataTypes.INTEGER,
              allowNull: false,
            },
          userName: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            
            commentary: {
              type: DataTypes.TEXT,
              allowNull: false
            },
            datePosted: {
              type: DataTypes.DATE,
              allowNull: false
            },
            reply: {
              type: DataTypes.INTEGER,
              defaultValue: 0,
              allowNull: false,
            },
            user_name_reply: {
              type: DataTypes.STRING,
              defaultValue: 0,
              allowNull: false,
            },
            report: {
              type: DataTypes.INTEGER,
              defaultValue: 0,
              allowNull: false,
            },
          }, {
            // Other model options go here
            timestamps: false,
            freezeTableName: true
          });

          this.User.hasMany(this.Commentary,{foreignKey: "userId",onDelete: 'SET NULL'});
          this.Commentary.belongsTo(this.User,{foreignKey: "userId"});
          
          this.Words.hasMany(this.Commentary,{foreignKey: "wordId"});
          this.Commentary.belongsTo(this.Words,{foreignKey: "wordId"});

          this.listPointer = {'User': this.User, 'words': this.Words,'kanjis': this.Kanjis, 'verb': this.FormVerb,'adj': this.FormAdj,'commentary': this.Commentary, 'fr': this.KanjisFR};
    }
}