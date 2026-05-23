<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Frases do BTS — Novo endereço</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #ffffff;
      font-family: system-ui, sans-serif;
      text-align: center;
      padding: 2rem 1.5rem;
    }
    img.logo { width: 56px; height: 56px; object-fit: contain; margin-bottom: 1.25rem; }
    h1 {
      font-family: 'Anton', sans-serif;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: #3B125C;
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    p {
      font-size: 1rem;
      color: #555;
      max-width: 380px;
      line-height: 1.7;
      margin-bottom: 1.75rem;
    }
    a.btn {
      display: inline-block;
      background: linear-gradient(135deg, #3B125C, #ec4899);
      color: #fff;
      font-size: 0.8rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      padding: 14px 32px;
      border-radius: 999px;
      text-decoration: none;
      margin-bottom: 1.5rem;
    }
    .counter {
      font-size: 0.7rem;
      color: #aaa;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
    }
    .dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #a855f7;
      animation: ping 1.2s ease-in-out infinite;
    }
    @keyframes ping {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.4; transform: scale(1.5); }
    }
    footer {
      position: fixed;
      bottom: 1.5rem;
      font-size: 0.65rem;
      color: #ccc;
      letter-spacing: 0.15em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <img class="logo" src="https://i.imgur.com/kLmiBhu.png" alt="BTS" />
  <h1>Frases do BTS</h1>
  <p>
    Mudamos de endereço! 💜<br>
    Você será redirecionada em instantes para o nosso novo lar.
  </p>
  <a class="btn" href="https://frasesdobts.lovable.app">Ir agora para o novo site</a>
  <div class="counter">
    <div class="dot"></div>
    Redirecionando em <span id="ct">8</span>s
  </div>
  <footer>Feito com 💜, de uma ARMY para o ARMY.</footer>
  <script>
    let s = 8;
    const el = document.getElementById('ct');
    const timer = setInterval(function () {
      s--;
      if (el) el.textContent = s;
      if (s <= 0) {
        clearInterval(timer);
        window.location.href = 'https://frasesdobts.lovable.app';
      }
    }, 1000);
  </script>
</body>
</html>
