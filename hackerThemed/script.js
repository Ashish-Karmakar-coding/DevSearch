// Matrix rain effect
        const canvas = document.getElementById('matrix-rain');
        const ctx = canvas.getContext('2d');
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
        const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const nums = '0123456789';
        const symbols = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        
        const alphabet = katakana + latin + nums + symbols;
        
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        
        const rainDrops = [];
        
        for (let x = 0; x < columns; x++) {
            rainDrops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00FF00';
            ctx.font = fontSize + 'px Courier New';
            
            for (let i = 0; i < rainDrops.length; i++) {
                const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
                ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
                
                if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    rainDrops[i] = 0;
                }
                rainDrops[i]++;
            }
        };
        
        setInterval(draw, 30);

        // Clock
        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            document.getElementById('clock').textContent = `${hours}:${minutes}:${seconds}`;
            
            // Occasionally "glitch" the clock for hacking effect
            if (Math.random() < 0.01) {
                document.getElementById('clock').textContent = 
                    `${Math.floor(Math.random() * 24)}:${Math.floor(Math.random() * 60)}:${Math.floor(Math.random() * 60)}`;
                setTimeout(updateClock, 100);
            } else {
                setTimeout(updateClock, 1000);
            }
        }
        
        updateClock();

        // Terminal typing effect
        const commands = [
            "SCANNING NETWORK...",
            "ESTABLISHING SECURE CONNECTION...",
            "RETRIEVING DATA...",
            "COMPILING CODE...",
            "RUNNING DIAGNOSTICS...",
            "ACCESSING CACHE...",
            "OPTIMIZING PERFORMANCE..."
        ];
        
        function randomCommand() {
            const terminalText = document.querySelector('.terminal-text');
            const newLine = document.createElement('div');
            newLine.className = 'terminal-line';
            
            newLine.innerHTML = `<span class="command">SYSTEM:</span> ${commands[Math.floor(Math.random() * commands.length)]}`;
            
            terminalText.appendChild(newLine);
            
            // Keep only last 5 lines
            while (terminalText.children.length > 5) {
                terminalText.removeChild(terminalText.firstChild);
            }
            
            setTimeout(randomCommand, 5000 + Math.random() * 10000);
        }
        
        setTimeout(randomCommand, 3000);

        // TODO List Functionality
        document.getElementById('todo-toggle').addEventListener('click', () => {
            document.getElementById('todo-sidebar').classList.add('active');
            document.getElementById('todo-toggle').style.display = 'none';
        });

        document.getElementById('close-todo').addEventListener('click', () => {
            document.getElementById('todo-sidebar').classList.remove('active');
            document.getElementById('todo-toggle').style.display = 'block';
        });

        document.getElementById('add-todo').addEventListener('click', addTodo);
        document.getElementById('todo-input').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        function addTodo() {
            const input = document.getElementById('todo-input');
            const task = input.value.trim();
            if (task) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <span>${task}</span>
                    <button class="delete-todo">X</button>
                `;
                document.getElementById('todo-list').appendChild(li);
                input.value = '';
                
                li.querySelector('.delete-todo').addEventListener('click', () => {
                    li.remove();
                });
            }
        }