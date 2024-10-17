async function PostBlog(event) {
  event.preventDefault();

  
  const form = document.getElementById("blogForm");
  const formData = new FormData(form);

  try {
    
    const response = await fetch("http://localhost:3000/post_blog", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.success) {
      
      let existingPopup = document.getElementById("popupMessage");
      if (existingPopup) {
        existingPopup.remove();
      }

     
      const popup = document.createElement("div");
      popup.id = "popupMessage";
      popup.innerText = "Blog submitted successfully!";

      
      document.body.appendChild(popup);

      
      popup.style.display = "block";

      setTimeout(() => {
        popup.style.display = "none";
        document.getElementById("blogForm").reset();
      }, 3000);
    } else {
      alert("Error: " + result.message);
    }
  } catch (error) {
    console.error("Error submitting blog:", error);
    alert("An error occurred while submitting the blog.");
  }
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    const blogContent = document.getElementById('blogContent');
    const startVoiceInputButton = document.getElementById('start-voice-input');

    let isListening = false;

    startVoiceInputButton.addEventListener('click', () => {
        if (isListening) {
            recognition.stop();
            startVoiceInputButton.innerText = '🎤';
            isListening = false;
        } else {
            recognition.start();
            startVoiceInputButton.innerText = '🛑';
            isListening = true;
        }
    });

    recognition.onresult = (event) => {
        const transcript = event.results[event.resultIndex][0].transcript;
        blogContent.value += ' ' + transcript;
    };

    recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        alert("Error with voice input: " + event.error);
    };
} else {
    alert("Speech recognition is not supported by your browser.");
}



async function getWritingSuggestions() {
  const content = document.getElementById("blogContent").value;

  
  if (!content) {
    alert("Please enter some content to get suggestions.");
    return;
  }

  try {
    
    const response = await fetch('http://127.0.0.1:5000/grammar-correct', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: content }) 
    });

    
    if (response.ok) {
      const result = await response.json();
      const suggestions = result.corrected_text || "No suggestions available";

      
      document.getElementById("suggestionsText").innerText = suggestions;
      document.getElementById("suggestionsContainer").classList.add('visible');
    } else {
      console.error("Error fetching suggestions:", response.status);
      alert("Failed to fetch suggestions. Please try again later.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred while fetching suggestions.");
  }
}


document.getElementById("getSuggestions").addEventListener("click", getWritingSuggestions);
