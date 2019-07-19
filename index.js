(function() {
    'use strict';
    document.body.addEventListener('keydown', evt => {
        const key = evt.keyCode || evt.which;
        if (evt.altKey && key == 74 /* Alt-J */) {
            if (document.querySelector('#blurControls')) return;
            handleFocusSelect();
        }
        if (evt.altKey && key == 75 /* Alt-K */) {
            handleToggleFocusControls();
        };
        if (evt.altKey && key == 76 /* Alt-L */){
            handleReset();
        };
    });
    function handleToggleFocusControls(){
        const blurControls = document.querySelector('#blurControls')
        if (blurControls){
            blurControls.style.display == 'none' ? blurControls.style.display = 'block' : blurControls.style.display = 'none';
        }
    }
    function handleReset(){
        document.querySelectorAll('.blurred').forEach(element => element.style.filter = '');
    }
    function createBlurControls(){
        const blurControls = document.createElement('div');
        const l = document.createElement('input'),
              b = document.createElement('input');
        const w = 150, h = 32, p = 15, m = 10;
        const labelL = document.createElement('label'),
              labelB = document.createElement('label');
        labelL.for = '#blurLength';
        labelB.for = '#blurBright';
        labelL.innerText = 'Length';
        labelB.innerText = 'Brightness';
        labelL.setAttribute('id', 'labelL');
        labelB.setAttribute('id', 'labelB');
        blurControls.setAttribute('id', 'blurControls');
        l.setAttribute('id', 'blurLength');
        b.setAttribute('id', 'blurBright');
        blurControls.style.padding = `${p}px`;
        l.style.margin = `${m}px`;
        b.style.margin = `${m}px`;
        l.style.height = `${h}px`;
        b.style.height = `${h}px`;
        l.type = 'range';
        b.type = 'range';
        l.min = '1';
        l.max = '10';
        l.step = '1';
        b.min = '0';
        b.max = '1';
        b.step = '0.05';
        blurControls.appendChild(l);
        blurControls.appendChild(labelL);
        blurControls.appendChild(b);
        blurControls.appendChild(labelB);
        blurControls.style.position = 'fixed';
        blurControls.style.top = '20px';
        blurControls.style.right = `${0.5*w}px`;
        blurControls.style.width = `${2*w}px`;
        blurControls.style.height = `${2*h + 4*m + 2*p}px`;
        blurControls.style.backgroundColor = '#000';
        blurControls.style.color = '#59cae7';
        blurControls.style.zIndex = '1234';
        document.body.appendChild(blurControls);
        document.querySelectorAll('#blurControls *').forEach(el => el.style.color = 'inherit')
    }
     function highlight(element){
        //TODO a lot of work here!
        //console.log(element);
    }
    function removeBlur(event){
        console.log(event.target);
        event.target.style.filter = '';
        event.target.removeEventListener('click', removeBlur);
    }
     function handleFocusSelect(){
        alert('Select the elements to blur out!');
        createBlurControls();
        document.addEventListener('mouseover', evt => highlight(evt.target));
        document.addEventListener('click', evt => {
            if (evt.target == document.querySelector('#blurLength') || evt.target == document.querySelector('#blurBright') || evt.target == document.querySelector('#blurControls') || evt.target == document.querySelector('#labelL') || evt.target == document.querySelector('#labelB')) return;
            if (evt.target.classList.contains('blurred')) {
                evt.target.style.filter = '';
                evt.target.classList.remove('blurred');
                return;
            }
            const lengthEl = document.querySelector('#blurLength'),
                  brightEl = document.querySelector('#blurBright');
            const length = (lengthEl && lengthEl.value) || 4;
            const brightness = (brightEl && brightEl.value) || 1.0;
            evt.target.style.filter = `blur(${length}px) brightness(${brightness})`;
            evt.target.classList.add('blurred');
        });
     }

})();
