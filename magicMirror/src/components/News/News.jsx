import React, { useState, useEffect, useRef } from 'react';
import { parseStringPromise } from 'xml2js';
import './News.css';

export default function News() {
    const [articles, setArticles] = useState([]);
    const [xmlData, setXmlData] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchXML = async () => {
            try {
                const response = await fetch('https://rss.aftonbladet.se/rss2/small/pages/sections/kultur/');
                const data = await response.text(); // Konvertera svaret till text
                setXmlData(data); // Spara XML-datan
            } catch (error) {
                setError('Det gick inte att hämta data: ' + error.message);
            }
        };

        fetchXML();
    }, []);

    useEffect(() => {
        const parseXML = async () => {
            if (!xmlData) return;

            try {
                const result = await parseStringPromise(xmlData);
                const items = result.rss.channel[0].item;
                setArticles(items);
            } catch (error) {
                setError('Fel vid parsing av XML: ' + error.message);
            }
        };

        parseXML();
    }, [xmlData]);

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Nyheter från Aftonbladet</h1>
            <div className="news-container">
                <ul className="news-list">
                    {articles.concat(articles).map((article, index) => (
                        <li key={index}>
                            <h2>{article.title[0]}</h2>
                            <p>{article.description[0]}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
