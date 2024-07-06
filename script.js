document.addEventListener('DOMContentLoaded', function () {
    const buttonGroups = document.querySelectorAll('.buttons');
    
    buttonGroups.forEach(group => {
        const buttons = group.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('click', function () {
                buttons.forEach(btn => btn.classList.remove('selected'));
                this.classList.add('selected');
            });
        });
    });
});
