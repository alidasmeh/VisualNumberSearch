# VisualNumberSearch
In the field of Cognitive Science, It is one of the most famous assessments for measuring the brain's hemispheres' functions.

This assessment is so easy. Users need to click on numbers 1 to 24, consecutively. 
The reaction times are saved in the report attribute of VNS object. Finally, by the calc_average_in_two_half method in the VNS object the reaction times on the left side and right side are calculated separately. 

There are just two patterns for this assessment, it can be seen in the "patterns" attribute in the VNS object.


Results will be like those presented in the Console, from the send_data method in the VNS object (in assets/vns.js):
```
{
    "data": [
        {
            "number": 1,
            "status": true,
            "duration": 7993
        },
        {
            "number": 2,
            "status": true,
            "duration": 529
        },
        ...
    ],
    "averages": {
        "left_avg": 2049.75,
        "right_avg": 1529.5833333333333
    },
    "pattern": [
        3,
        23,
        20,
        ...
    ]
}
```

- Obviously, the closer these two numbers (result.averages.left_avg and result.averages.right_avg) are, the closer the functioning of the two sides of the brain is.