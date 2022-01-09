import React, { useEffect, useState } from 'react';

function Grid() {
    const [gridMat, setGridMat] = useState([]);
    //שלא יהיה חריגה מגבולות המטריצה אני מוסיפה מסגרת אפסים למטריצה
    //לכן זה מאותחל ב2 מקומות יותר
    const sizeGrid = 51; //50*50

    useEffect(() => {
        const matrix = [];
        for (let y = 0; y <= sizeGrid; y++) {
            const row = [];
            for (let x = 0; x <= sizeGrid; x++) {
                if (x === 0 || y === 0 || x === sizeGrid || y === sizeGrid)
                    row.push(0);
                else
                    row.push(Math.round(Math.random()));
            }
            matrix.push(row);
        }
        setGridMat(matrix);
    }, []);

    useEffect(() => {
        if (gridMat?.length > 0) {
            setTimeout(() => {
                //מעבר על כל השכנים וקביעה האם מת או חי
                gridTicks();
            }, 400);
        }
    }, [gridMat])

    //אתחול מטריצה באפסים
    const initialMatrix = (matrixZero, length) => {
        let matrixEzer = [...matrixZero];
        for (let x = 0; x <= length; x++) {
            let row = [];
            for (let y = 0; y <= length; y++) {
                row.push(0);
            }
            matrixEzer.push(row);
        }
        return matrixEzer;
    }

    //פונקציה למציאת מספר השכנים החיים
    const NumberOfLivingNighbors = (i, j) => {
        let count = 0;
        for (let l = i - 1; l <= i + 1; l++) {
            for (let k = j - 1; k <= j + 1; k++) {
                if (!(l === i && k === j))
                    count += gridMat[l][k];
            }
        }
        return count;
    }

    //פונקציה שעוברת על כל המטריצה ומחייה או ממיתה וכו
    const gridTicks = () => {
        //מטריצת עזר לשינוי הערכים
        let _gridMat = [];
        _gridMat = initialMatrix(_gridMat, sizeGrid);
        let count = 0;

        for (let i = 0; i < sizeGrid - 1; i++) {
            for (let j = 0; j < sizeGrid - 1; j++) {
                count = NumberOfLivingNighbors(i + 1, j + 1);
                if (gridMat[i + 1][j + 1] === 1) {
                    if (count < 2 || count > 3)
                        _gridMat[i + 1][j + 1] = 0;
                    else if (count === 2 || count === 3)
                        _gridMat[i + 1][j + 1] = 1;
                }
                else if (gridMat[i + 1][j + 1] === 0 && count === 3) {
                    _gridMat[i + 1][j + 1] = 1;
                }
            }
        }
        setGridMat(_gridMat);
    }

    return (
        <div className="grid">
            {
                gridMat && gridMat?.map((row, indexRow) => {
                    let type = "dead";
                    if (indexRow === 0 || indexRow === sizeGrid)
                        return null;
                    return (
                        row && row?.map((square, index) => {
                            if (index === 0 || index === sizeGrid)
                                return null
                            if (square === 1)
                                type = "alive";
                            else
                                type = "dead";
                            return <div className={type} key={(indexRow * 2 + index) * 10} style={{
                                width: `calc(${100 / (sizeGrid - 1)}% - 2px)`,
                                height: `calc(${100 / (sizeGrid - 1)}% - 2px)`
                            }}></div>
                        })
                    );
                })
            }
        </div>
    );
}

export default Grid;