function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Dadu titik sebelah kiri
    const set_color = {
        tengah : [0.69, 0.589, 0.31],
        tepi : [0.340, 0.288, 0.146]
    }

    const dadu1 = {

        A : [-0.35,0.575],
        B : [-0.36,0.55],
        C : [-0.34,0.44],
        D : [-0.3,0.41],
        E : [-0.27,0.42],
        F : [-0.20,0.49],
        G : [-0.19,0.52],
        H : [-0.19,0.55],
        I : [-0.24,0.665],
        J : [-0.25,0.68],
        K : [-0.29,0.685],
        // L : [-0.27,0.42],
        // M : [-0.20,0.49],
        // N : [-0.19,0.52],
    }

    // Dadu satatik sebelah kanan

    const vertices = [

        //kiri
        // ...object_dadu_1.A, ...object_dadu_1.color2,
        ...dadu1.C, ...set_color.tengah,
        ...dadu1.D, ...set_color.tengah,
        ...dadu1.E, ...set_color.tengah,
        ...dadu1.C, ...set_color.tengah,
        ...dadu1.E, ...set_color.tengah,
        ...dadu1.B, ...set_color.tengah,

        ...dadu1.E, ...set_color.tengah,
        ...dadu1.B, ...set_color.tengah,
        ...dadu1.F, ...set_color.tengah,
        ...dadu1.F, ...set_color.tengah,
        ...dadu1.B, ...set_color.tengah,
        ...dadu1.G, ...set_color.tengah,

        ...dadu1.G, ...set_color.tengah,
        ...dadu1.B, ...set_color.tengah,
        ...dadu1.H, ...set_color.tengah,
        ...dadu1.B, ...set_color.tengah,
        ...dadu1.H, ...set_color.tengah,
        ...dadu1.A, ...set_color.tengah,

        ...dadu1.H, ...set_color.tengah,
        ...dadu1.A, ...set_color.tengah,
        ...dadu1.I, ...set_color.tengah,
        ...dadu1.I, ...set_color.tengah,
        ...dadu1.A, ...set_color.tengah,
        ...dadu1.J, ...set_color.tengah,

        ...dadu1.J, ...set_color.tengah,
        ...dadu1.A, ...set_color.tengah,
        ...dadu1.K, ...set_color.tengah
    ]


    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    var vertexShaderCode = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);


    var vertexShaderSource = `
        attribute vec2 aPosition;
        attribute vec3 aColor;
        varying vec3 vColor;
        uniform float uChange;
        void main() {
            gl_Position = vec4(aPosition.x, aPosition.y, 1.0, 1.0);
            vColor = aColor;
        }
    `;

    var fragmentShaderSource = `
        precision mediump float;
        varying vec3 vColor;
        void main() {
            gl_FragColor = vec4(vColor, 1.0);
        }
    `;

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);


    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);


    var shaderProgram = gl.createProgram();


    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);


    gl.linkProgram(shaderProgram);


    gl.useProgram(shaderProgram);


    var aPosition = gl.getAttribLocation(shaderProgram, "aPosition");
    gl.vertexAttribPointer(
        aPosition,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0
    );
    gl.enableVertexAttribArray(aPosition);
    var aColor = gl.getAttribLocation(shaderProgram, "aColor");
    gl.vertexAttribPointer(
        aColor,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        2 * Float32Array.BYTES_PER_ELEMENT
    );
    gl.enableVertexAttribArray(aColor);

    // var speed = 0.0064;
    // var change = 0;
    // var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    // function moveVertices() {
    //     if (vertices[126] < -1.0 || vertices[91] > 1.0) {
    //         speed = speed * -1;
    //     }

    //     for (let i = 91; i < vertices.length; i += 5) {
    //         vertices[i] = vertices[i] + speed;
    //     }
    // }


    function render() {
        // moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        // change = change + speed;
        // gl.uniform1f(uChange, change);
        gl.clearColor(0.432, 0.702, 0.800, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 27;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}