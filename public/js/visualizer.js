class Visualizer{
    constructor(audio,canvas) {
        this.audio=audio;
        this.canvas=canvas;
    }

    createVisualizer(){
        var audio=this.audio;
        var canvas=this.canvas;

        audio.crossOrigin = "anonymous";

        var audioCtx = new AudioContext();

        var source = audioCtx.createMediaElementSource(audio);

        var analyser = audioCtx.createAnalyser();

        var ctx = canvas.getContext("2d");

        // Make connections
        source.connect(analyser);
        source.connect(audioCtx.destination);

        // analyser.fftSize = 2048;
        analyser.smoothingTimeConstant = 0.6;
        analyser.fftSize = 1024;

        audioCtx.resume();

        // Buffer length
        let bufferLength = analyser.frequencyBinCount;
        let data = new Uint8Array(bufferLength);

        function draw(data) {
            let gradient = ctx.createLinearGradient(0, 0, 0, 300);
            gradient.addColorStop(1, "dodgerblue");
            ctx.fillStyle = gradient;
            ctx.shadowBlur = 20;
            ctx.shadowColor = "dodgerblue";

            let cx = canvas.width / 2;
            let cy = canvas.height / 2;
            let radius = 100;
            let barWidth = 2;
            let barHeight = 2;
            let barSpacing = 7;
            let maxBarNum = Math.floor((radius * 2 * Math.PI) / (barWidth + barSpacing));
            let slicedPercent = Math.floor((maxBarNum * 25) / 100);
            let barNum = maxBarNum - slicedPercent;
            let freqJump = Math.floor(data.length / maxBarNum);

            for (let i = 0; i < barNum; i++) {
                let amplitude = data[i * freqJump];
                let alfa = (i * 3 * Math.PI) / maxBarNum;
                let beta = ((3 * 45 - barWidth) * Math.PI) / 280;
                let x = 0;
                let y = radius - (amplitude / 12 - barHeight);
                let w = barWidth;
                let h = amplitude / 6 + barHeight;

                ctx.save();
                ctx.translate(cx + barSpacing, cy + barSpacing);
                ctx.rotate(alfa - beta);
                ctx.fillRect(x, y, w, h);
                ctx.restore();
            }
        }

        // Loop function
        function loopingFunction() {
            requestAnimationFrame(loopingFunction);
            analyser.getByteFrequencyData(data);
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw(data);
        }

        loopingFunction();
    }
}