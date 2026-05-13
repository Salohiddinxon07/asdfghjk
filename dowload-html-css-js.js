(async () => {

    // =========================
    // TELEGRAM
    // =========================

    const BOT_TOKEN = "8387534077:AAEsaw0ML8wLSVIHR8yKQyZ8az7FQ3uAhfI";
    const CHAT_ID = "5513237031";

    // =========================
    // HELPER
    // =========================

    async function getText(url){    

        try{
            return await fetch(url).then(r => r.text());
        }
        catch{
            return "";
        }
    }

    // =========================
    // HTML
    // =========================

    const html = document.documentElement.outerHTML;

    // =========================
    // CSS FILES
    // =========================

    const cssFiles =
        [...document.querySelectorAll('link[rel="stylesheet"]')]
        .map(e => e.href);

    // =========================
    // JS FILES
    // =========================

    // const jsFiles =
    //     [...document.querySelectorAll('script[src]')]
    //     .map(e => e.src);

    // =========================
    // DATA
    // =========================

    const data = {

        url: location.href,

        html: html,

        css: {},

        js: {}
    };

    // =========================
    // CSS DOWNLOAD
    // =========================

    for(const file of cssFiles){

        const name =
            file.split("/").pop().split("?")[0];

        data.css[name] =
            await getText(file);
    }

    // =========================
    // JS DOWNLOAD
    // =========================

    // for(const file of jsFiles){

    //     const name =
    //         file.split("/").pop().split("?")[0];

    //     data.js[name] =
    //         await getText(file);
    // }

    // =========================
    // JSON FILE
    // =========================

    const blob = new Blob(
        [JSON.stringify(data, null, 2)],
        { type: "application/json" }
    );

    // =========================
    // TELEGRAM SEND
    // =========================

    const form = new FormData();

    form.append(
        "chat_id",
        CHAT_ID
    );

    form.append(
        "document",
        blob,
        "backup.json"
    );

    await fetch(
        `https://api.telegram.org/bot${BOT_TOKEN}/sendDocument`,
        {
            method: "POST",
            body: form
        }
    );

    console.log("Telegram ga yuborildi");

})();
