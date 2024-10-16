document.getElementById('process-button').addEventListener('click', async () => {
    const textInput = document.getElementById('text-input').value;
    const response = await fetch('http://localhost:5000/api/process-text', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textInput }),
    });

    const complexWords = await response.json();
    const infographicsDiv = document.getElementById('infographics');
    infographicsDiv.innerHTML = '';

    for (const word of complexWords) {
        const wordResponse = await fetch(`http://localhost:5000/api/word-data?word=${word}`);
        const wordData = await wordResponse.json();
        
        // Generate infographic
        const infographic = document.createElement('div');
        infographic.className = 'infographic';
        infographic.innerHTML = `
            <h2>${wordData[0].word}</h2>
            <p><strong>Definition:</strong> ${wordData[0].meanings[0].definitions[0].definition}</p>
            <p><strong>Example:</strong> ${wordData[0].meanings[0].definitions[0].example || 'N/A'}</p>
            <p><strong>Synonyms:</strong> ${wordData[0].meanings[0].synonyms.join(', ')}</p>
            <p><strong>Antonyms:</strong> ${wordData[0].meanings[0].antonyms.join(', ') || 'N/A'}</p>
            <p><strong>Word Origin:</strong> ${wordData[0].origin || 'N/A'}</p>
        `;
        infographicsDiv.appendChild(infographic);
    }
});
