const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

const Country = sequelize.define('Country', {
  name: DataTypes.STRING,
  country_code_two: DataTypes.STRING,
  country_code_three: DataTypes.STRING,
  mobile_code: DataTypes.INTEGER,
  continent_id: DataTypes.INTEGER
}, { timestamps: true });

const City = sequelize.define('City', {
  name: DataTypes.STRING,
  country_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Country,
      key: 'id'
    }
  },
  is_active: DataTypes.BOOLEAN,
  lat: DataTypes.FLOAT,
  long: DataTypes.FLOAT
}, { timestamps: true });

const Airport = sequelize.define('Airport', {
  icao_code: DataTypes.STRING,
  iata_code: DataTypes.STRING,
  name: DataTypes.STRING,
  type: DataTypes.STRING,
  latitude_deg: DataTypes.FLOAT,
  longitude_deg: DataTypes.FLOAT,
  elevation_ft: DataTypes.INTEGER,
  city_id: {
    type: DataTypes.INTEGER,
    references: {
      model: City,
      key: 'id'
    }
  }
}, { timestamps: true });

City.belongsTo(Country, { foreignKey: 'country_id' });
Airport.belongsTo(City, { foreignKey: 'city_id' });

module.exports = { sequelize, Airport, City, Country };
