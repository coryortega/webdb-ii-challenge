
exports.up = function(knex) {

    return knex.schema.createTable("cars", tbl => {
        tbl.increments();

        tbl.string("VIN", 255)
            .notNullable()
            .unique()
            .index();

        tbl.string("make")
            .notNullable()
            .index();

        tbl.string("model")
            .notNullable()
            .index();

        tbl.integer("mileage")
            .notNullable()
            .index();
        
        tbl.integer("transmission type")
            .nullable()
            .index();

        tbl.integer("title")
            .nullable()
            .index();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars");
};
