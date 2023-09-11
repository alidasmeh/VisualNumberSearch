let VNS = {
    patterns: [
        [3, 23, 20, 10, 13, 17, 6, 9, 1, 24, 22, 5, 18, 11, 16, 8, 2, 15, 14, 7, 21, 19, 4, 12],
        [13, 18, 10, 22, 6, 12, 14, 3, 19, 16, 21, 17, 7, 24, 15, 1, 5, 20, 8, 4, 2, 11, 23, 9]
    ],
    current_number: 0,
    report: [],
    stopwatch: 0,
    selected_pattern: null,
    render_boxes: function() {
        let random = Math.floor(Math.random() * this.patterns.length);

        this.selected_pattern = this.patterns[random];
        this.patterns[random].forEach((number) => {
            let numberStr = number;
            if (String(number).length < 2) {
                numberStr = "0" + String(number);
            }
            $(".number_boxes").append(`<div class="box" onclick="VNS.submit_number(${number})">${numberStr}</div>`);
        })

        $("#next_number").html(1);
        this.stopwatch = Date.now();
    },
    submit_number: function(number) {
        let status = false;

        if (this.current_number + 1 == number) {
            this.current_number = number,
                status = true;
        } else {
            alert("wrong")
        }

        this.report.push({
            number: number,
            status: status,
            duration: Date.now() - this.stopwatch
        })
        this.stopwatch = Date.now();

        if (this.current_number == 24) {
            this.send_data(this.report);
            $("#next_number").html("Finished");
            alert("OPEN CONSOLE.")
            return
        }

        $("#next_number").html(this.current_number + 1);
    },
    calc_average_in_two_half(user_data) {
        let lefts = [];
        let left_total = 0;
        let rights = [];
        let right_total = 0;

        this.selected_pattern.forEach((row, index) => {
            if (index == 0 || index == 1 || index == 2 || index == 6 || index == 7 || index == 8 || index == 13 || index == 14 || index == 15 || index == 19 || index == 20 || index == 21) {
                lefts.push(row);
            } else {
                rights.push(row);
            }
        });

        lefts.forEach((left) => {
            user_data.forEach(user_row => {
                if (left == user_row.number) left_total += user_row.duration
            })
        })

        rights.forEach((right) => {
            user_data.forEach(user_row => {
                if (right == user_row.number) right_total += user_row.duration
            })
        })

        return {
            left_avg: left_total / 12,
            right_avg: right_total / 12
        }
    },
    send_data: function(data) {
        let final_data = {}
        final_data['data'] = data;
        final_data['averages'] = this.calc_average_in_two_half(data);
        final_data['pattern'] = this.selected_pattern;

        // Here you can send final_data as result to DB
        console.log(final_data)
    }
}

document.addEventListener("DOMContentLoaded", function() {
    VNS.render_boxes()
});