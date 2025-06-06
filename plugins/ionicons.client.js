export default defineNuxtPlugin(() => {
  // Load Ionicons script in client-side only
  if (process.client) {
    const scriptModule = document.createElement('script');
    scriptModule.type = 'module';
    scriptModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js';
    document.head.appendChild(scriptModule);
    
    const scriptNoModule = document.createElement('script');
    scriptNoModule.noModule = true;
    scriptNoModule.src = 'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js';
    document.head.appendChild(scriptNoModule);
  }
});
