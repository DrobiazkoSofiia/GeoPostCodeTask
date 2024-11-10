import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Country {
  name: string;
  continent: string;
  iso: string;
  noPostalCode: boolean;
  limited: boolean;
  notAvailable: boolean;
  url: string;
  continentCode: number;
}

const CountryDetailsPage: React.FC = () => {
  const { url } = useParams<{ url: string }>();
  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/GeoPostcodes/technical-test/main/front-end/data/countries.json'
        );
        const data = response.data;

        const countryData = data.find((country: Country) => country.url === url);

        if (countryData) {
          setCountry(countryData);
        } else {
          setError('Country not found');
        }
      } catch (error) {
        setError('Error fetching country details');
        console.error('Error fetching country details:', error);
      } finally {
        setLoading(false); 
      }
    };

    if (url) {
      fetchCountryDetails();
    }
  }, [url]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ paddingTop:'10%', backgroundSize:'cover', height:'100vh', paddingLeft:'35%', backgroundImage: 'url("https://img.freepik.com/free-vector/vector-abstract-earth-relief-map-generated-conceptual-elevation-map-isolines-landscape-surface-elevation_1217-4261.jpg?t=st=1731261687~exp=1731265287~hmac=3f1b81cba697156a775269e6e246b4a218d87e92ce33414467c521e1fd4ca6b8&w=1060")'}}>
      {country && (
        <div style={{ backgroundColor:'#0a3a6b', width:340, height:'auto', borderRadius:15, alignContent:'center',paddingLeft:'10%' }}>
         <div style={{ display: 'flex', alignItems: 'center', flex: 1, width: 300 }}>
  <img
    src={`https://flagcdn.com/w320/${country.iso.toLowerCase()}.png`}
    alt={`${country.name} flag`}
    style={{ width: 30, height: 25, marginRight: 10 }}
  />
  <h2 style={{ color: 'white' }}>{country.name}</h2>
</div>
          <p style={{color:'white'}}><strong>Continent:</strong> {country.continent}</p>
          <p style={{color:'white'}}><strong>ISO Code:</strong> {country.iso}</p>
          <p style={{color:'white'}}><strong>Postal Code Availability:</strong> {country.noPostalCode ? 'No' : 'Yes'}</p>
          <p style={{color:'white'}}><strong>Limited Availability:</strong> {country.limited ? 'Yes' : 'No'}</p>
          <p style={{color:'white'}}><strong>Not Available:</strong> {country.notAvailable ? 'Yes' : 'No'}</p>
          <p style={{color:'white'}}><strong>Continent code:</strong> {country.continentCode}</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetailsPage;
