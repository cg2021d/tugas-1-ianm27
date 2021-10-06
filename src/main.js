function main(){
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // Dadu titik sebelah kiri
    const object_dadu_1 = {

        color1 : [0.39, 0.31, 0.31],
        color2 : [0.76, 0.65, 0.58],
        color3 : [0.45, 0.32, 0.22],

        A : [-0.52, 0.47],
        B : [-0.2, 0.27],
        C : [-0.82, 0.29],
        D : [-0.5, 0.05],
        E : [-0.2, -0.18],
        F : [-0.82, -0.18],
        G : [-0.5, -0.47],
    }

    // Dadu satatik sebelah kanan
    const object_dadu_2 = {
        color1 : [0.39, 0.31, 0.31],
        color2 : [0.76, 0.65, 0.58],
        color3 : [0.45, 0.32, 0.22],
        A : [0.44, 0.47],
        B : [0.2, 0.27],
        C : [0.82, 0.29],
        D : [0.5, 0.05],
        E : [0.2, -0.18],
        F : [0.82, -0.18],
        G : [0.5, -0.47],
    }

    const vertices = [

        //kiri
        ...object_dadu_1.A, ...object_dadu_1.color2,
        ...object_dadu_1.B, ...object_dadu_1.color2,
        ...object_dadu_1.C, ...object_dadu_1.color2,
        ...object_dadu_1.B, ...object_dadu_1.color2,
        ...object_dadu_1.C, ...object_dadu_1.color2,
        ...object_dadu_1.D, ...object_dadu_1.color2,

        ...object_dadu_1.C, ...object_dadu_1.color1,
        ...object_dadu_1.G, ...object_dadu_1.color1,
        ...object_dadu_1.F, ...object_dadu_1.color1,
        ...object_dadu_1.C, ...object_dadu_1.color1,
        ...object_dadu_1.D, ...object_dadu_1.color1,
        ...object_dadu_1.G, ...object_dadu_1.color1,

        ...object_dadu_1.B, ...object_dadu_1.color3,
        ...object_dadu_1.D, ...object_dadu_1.color3,
        ...object_dadu_1.G, ...object_dadu_1.color3,
        ...object_dadu_1.B, ...object_dadu_1.color3,
        ...object_dadu_1.G, ...object_dadu_1.color3,
        ...object_dadu_1.E, ...object_dadu_1.color3,

        //Kanan
        ...object_dadu_2.A, ...object_dadu_2.color2,
        ...object_dadu_2.B, ...object_dadu_2.color2,
        ...object_dadu_2.C, ...object_dadu_2.color2,
        ...object_dadu_2.B, ...object_dadu_2.color2,
        ...object_dadu_2.C, ...object_dadu_2.color2,
        ...object_dadu_2.D, ...object_dadu_2.color2,

        ...object_dadu_2.C, ...object_dadu_2.color1,
        ...object_dadu_2.G, ...object_dadu_2.color1,
        ...object_dadu_2.F, ...object_dadu_2.color1,
        ...object_dadu_2.C, ...object_dadu_2.color1,
        ...object_dadu_2.D, ...object_dadu_2.color1,
        ...object_dadu_2.G, ...object_dadu_2.color1,

        ...object_dadu_2.B, ...object_dadu_2.color3,
        ...object_dadu_2.D, ...object_dadu_2.color3,
        ...object_dadu_2.G, ...object_dadu_2.color3,
        ...object_dadu_2.B, ...object_dadu_2.color3,
        ...object_dadu_2.G, ...object_dadu_2.color3,
        ...object_dadu_2.E, ...object_dadu_2.color3,

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

    var speed = 0.0064;
    var change = 0;
    var uChange = gl.getUniformLocation(shaderProgram, "uChange");

    function moveVertices() {
        if (vertices[126] < -1.0 || vertices[91] > 1.0) {
            speed = speed * -1;
        }

        for (let i = 91; i < vertices.length; i += 5) {
            vertices[i] = vertices[i] + speed;
        }
    }


    function render() {
        moveVertices();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        change = change + speed;
        gl.uniform1f(uChange, change);

        gl.clearColor(0.432, 0.702, 0.800, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        var primitive = gl.TRIANGLES;
        var offset = 0;
        var nVertex = 36;
        gl.drawArrays(primitive, offset, nVertex);
        requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
}
