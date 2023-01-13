(function readyJS(win, doc) {
    if (doc.querySelectorAll('.deletar')) {
        for (let i = 0; i < doc.querySelectorAll('.delete').length; i++) {
            doc.querySelectorAll('.delete')[i].addEventListener('click', function (event) {
                if (confirm("Deseja mesmo apagar este dado?")) {
                    return true;
                } else {
                    event.preventDefault();
                }
            });
        }
    }
})(window, document);