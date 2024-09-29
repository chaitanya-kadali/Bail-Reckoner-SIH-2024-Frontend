import React, { useState } from 'react';
import axios from 'axios';

function Translate() {
    const [text, setText] = useState('');
    const [translatedText, setTranslatedText] = useState('');
    const [language, setLanguage] = useState('en'); // default to english

    const handleTranslate = async () => {
        try {
            const response = await axios.post('http://localhost:5000/translate', {
                text: text,
                targetLanguage: language,
            });

            setTranslatedText(response.data.translatedText);
        } catch (error) {
            console.error('Error translating text:', error);
        }
    };
    const handleTranslatej = async () => {
       const translateFrom = 'en'; // considering english is by default BASE language
       // further modification is needed to store the current language before modifing it 
       const translateTo = language;
       console.log("translate To :  ",language);
        if(!text) return;
        // toText.setAttribute("placeholder", "Translating...");
        let apiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
        fetch(apiUrl).then(res => res.json()).then(data => {
             setTranslatedText(data.responseData.translatedText);
            data.matches.forEach(data => {
                if(data.id === 0) {
                setTranslatedText(data.translation);
                }
            });
            // toText.setAttribute("placeholder", "Translation");
        });
    }

    return (
        <div className="App">
            <h1>Web Page Translator</h1>
            <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to translate"
            />
            <div>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="hi">Hindi</option>
                    <option value="bn">Bengali</option>
                    <option value="te">Telugu</option>
                    <option value="ta">Tamil</option>
                    <option value="gu">Gujarati</option>
                    <option value="kn">Kannada</option>
                    <option value="mr">Marathi</option>
                    <option value="pa">Punjabi</option>
                    {/* Add more languages as needed */}
                </select>
                <button onClick={handleTranslatej}>Translate</button>
            </div>
            <div>
                <h2>Translated Text:</h2>
                <h3>{translatedText}</h3>
            </div>
        </div>
    );
}

export default Translate;
