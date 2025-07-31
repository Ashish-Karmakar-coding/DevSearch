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

        // Calendar functionality
        let currentDate = new Date();
        let selectedDate = new Date();

        function renderCalendar() {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();
            
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);
            const startDate = new Date(firstDay);
            startDate.setDate(startDate.getDate() - firstDay.getDay());
            
            const monthNames = [
                'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
                'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
            ];
            
            document.getElementById('calendar-title').textContent = `${monthNames[month]} ${year}`;
            
            const calendarDays = document.getElementById('calendar-days');
            calendarDays.innerHTML = '';
            
            const today = new Date();
            
            for (let i = 0; i < 42; i++) {
                const date = new Date(startDate);
                date.setDate(startDate.getDate() + i);
                
                const dayElement = document.createElement('div');
                dayElement.className = 'calendar-day';
                dayElement.textContent = date.getDate();
                
                // Check if it's today
                if (date.toDateString() === today.toDateString()) {
                    dayElement.classList.add('today');
                }
                
                // Check if it's from other month
                if (date.getMonth() !== month) {
                    dayElement.classList.add('other-month');
                }
                
                // Check if it's selected
                if (date.toDateString() === selectedDate.toDateString()) {
                    dayElement.classList.add('selected');
                }
                
                dayElement.addEventListener('click', () => {
                    selectedDate = new Date(date);
                    renderCalendar();
                });
                
                calendarDays.appendChild(dayElement);
            }
        }

        // Initialize calendar
        renderCalendar();

        // Calendar navigation
        document.getElementById('prev-month').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() - 1);
            renderCalendar();
        });

        document.getElementById('next-month').addEventListener('click', () => {
            currentDate.setMonth(currentDate.getMonth() + 1);
            renderCalendar();
        });

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
        let isDragging = false;
        let offsetX, offsetY;
        
        const todoSidebar = document.getElementById('todo-sidebar');
        
        document.querySelector('.todo-header').addEventListener('mousedown', (e) => {
            isDragging = true;
            const rect = todoSidebar.getBoundingClientRect();
            offsetX = e.clientX - rect.left;
            offsetY = e.clientY - rect.top;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            todoSidebar.style.left = `${e.clientX - offsetX}px`;
            todoSidebar.style.top = `${e.clientY - offsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        document.getElementById('todo-toggle').addEventListener('click', (e) => {
            todoSidebar.classList.toggle('active');
            if (todoSidebar.classList.contains('active')) {
                const btnRect = e.target.getBoundingClientRect();
                todoSidebar.style.left = `${btnRect.left}px`;
                todoSidebar.style.top = `${btnRect.bottom + 10}px`;
            }
        });

        document.getElementById('close-todo').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('todo-sidebar').classList.remove('active');
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

        // Calendar Sidebar Functionality
        let isCalendarDragging = false;
        let calendarOffsetX, calendarOffsetY;
        
        const calendarSidebar = document.getElementById('calendar-sidebar');
        
        document.querySelector('.calendar-header').addEventListener('mousedown', (e) => {
            isCalendarDragging = true;
            const rect = calendarSidebar.getBoundingClientRect();
            calendarOffsetX = e.clientX - rect.left;
            calendarOffsetY = e.clientY - rect.top;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isCalendarDragging) return;
            calendarSidebar.style.left = `${e.clientX - calendarOffsetX}px`;
            calendarSidebar.style.top = `${e.clientY - calendarOffsetY}px`;
        });

        document.addEventListener('mouseup', () => {
            isCalendarDragging = false;
        });

        document.getElementById('calendar-toggle').addEventListener('click', (e) => {
            calendarSidebar.classList.toggle('active');
            if (calendarSidebar.classList.contains('active')) {
                const btnRect = e.target.getBoundingClientRect();
                calendarSidebar.style.left = `${btnRect.left}px`;
                calendarSidebar.style.top = `${btnRect.bottom + 10}px`;
            }
        });

        document.getElementById('close-calendar').addEventListener('click', (e) => {
            e.stopPropagation();
            document.getElementById('calendar-sidebar').classList.remove('active');
        });