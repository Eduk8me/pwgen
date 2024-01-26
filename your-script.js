document.addEventListener('DOMContentLoaded', (event) => {
    generatePasswords(2);
    setActiveButton(2);
});

function generatePasswords(wordCount) {
	setActiveButton(wordCount);
    fetch('commonWords.json')
        .then(response => response.json())
        .then(data => {
            let passwords = createPasswords(data.words, wordCount);
            displayPasswords(passwords);
        })
        .catch(error => console.error('Error:', error));
}

function createPasswords(commonWords, wordCount) {
    let passwords = [];
    for (let i = 0; i < 10; i++) {
        let passwordWords = [];
        for (let j = 0; j < wordCount; j++) {
            passwordWords.push(capitalizeWord(getRandomWord(commonWords)));
        }
        let randomIndex = Math.floor(Math.random() * wordCount);
        passwordWords[randomIndex] += Math.floor(Math.random() * 100).toString();
        passwords.push(passwordWords.join('-'));
    }
    return passwords;
}

function getRandomWord(words) {
    return words[Math.floor(Math.random() * words.length)];
}

function capitalizeWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function displayPasswords(passwords) {
    const list = document.getElementById("passwordList");
    list.innerHTML = "";
    passwords.forEach(password => {
        let item = document.createElement("li");
        item.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

        let textSpan = document.createElement("span");
        textSpan.textContent = password;
        item.appendChild(textSpan);

        let actionsContainer = document.createElement("div");
        actionsContainer.classList.add("actions-container", "d-flex", "align-items-center");

        let icon = document.createElement("i");
        icon.classList.add("bi", "bi-clipboard");
        icon.style.cursor = "pointer";
        icon.onclick = function() { copyToClipboard(password, item); };
        actionsContainer.appendChild(icon);

        let countSpan = document.createElement("span");
        countSpan.textContent = `(${password.length})`;
        countSpan.style.marginLeft = "10px";
        actionsContainer.appendChild(countSpan);

        item.appendChild(actionsContainer);

        list.appendChild(item);
    });
}


function copyToClipboard(text, element) {
    navigator.clipboard.writeText(text).then(() => {
        element.classList.add('highlight');
        setTimeout(() => {
            element.classList.remove('highlight');
        }, 500); // 2 seconds for fade out
    }).catch(err => {
        console.error('Could not copy text: ', err);
    });
}

function setActiveButton(wordCount) {
    // Remove 'btn-primary' from all buttons and add 'btn-secondary'
    document.querySelectorAll('.word-count-btn').forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-secondary');
    });

    // Find the button that was clicked and update its class
    const activeBtn = Array.from(document.querySelectorAll('.word-count-btn')).find(btn => btn.textContent.trim() === `${wordCount} Words${wordCount === 2 ? ' (Default)' : ''}`);
    if (activeBtn) {
        activeBtn.classList.remove('btn-secondary');
        activeBtn.classList.add('btn-primary');
    }
}

