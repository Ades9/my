class Vorsord extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 20;
        this.directions = [];
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [];
        for (var i = this.x; i < matrix.length; i++) {
            this.directions.push([this.x, this.y + i]);
            this.directions.push([this.x, this.y - i]);
            this.directions.push([this.y, this.x - i]);
            this.directions.push([this.y, this.x + i]);



        }
    }

    chooseCell(num) {
        this.getNewCoordinates();
        var found = [];
        for (var i in this.directions) {
            var x = this.directions[i][0];
            var y = this.directions[i][1];
            if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                if (matrix[y][x] == num) {
                    found.push(this.directions[i]);
                }
                else if (matrix[y][x].index == num) {
                    found.push(this.directions[i]);
                }
            }
        }
        return found;
    }

    move() {
        var newCord = random(this.chooseCell(0));
        if (this.acted == false) {
            if (newCord) {
                var newX = newCord[0];
                var newY = newCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;
                this.acted = true;
                this.energy--;
                if (this.energy <= 0) {
                    this.die();
                }
            }
        }
    }
    mul() {
        this.multiply++;
        var newCord = random(this.chooseCell(0));

        if (newCord && this.multiply >= 8) {
            var newX = newCord[0];
            var newY = newCord[1];

            matrix[newY][newX] = new Vorsord(newX, newY, 5);
            this.multiply = 0;
        }
    }
    eat() {
        var newCord = random(this.chooseCell(4));
        if (this.acted == false) {
            if (newCord) {
                var newX = newCord[0];
                var newY = newCord[1];

                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;

                this.x = newX;
                this.y = newY;

                this.energy++;
                this.acted = true;
                if (this.energy >= 12) {
                    this.mul();
                }
                matrix[this.y][this.x] = new GrassEater(this.x, this.y, 2);
                this.multiply = 0;
            }
            else {
                this.move();
            }

        }

    }
    die() {

        matrix[this.y][this.x] = 0;
    }
}
