function First() {

    const n = [1, 2, 3, 4, 5];
    const students = [
        { id: 1, name: "Ansh", marks: 95 },
        { id: 2, name: "Ravi", marks: 88 },
    ];



    return (
        <>
            <div>hello</div>
            <ul>
                {n.map(num => (
                    <li key={num}>{num}</li>
                ))}
            </ul>
            <div>
                 //! here key is necessary for react to access it uniquly
                {students.map(student => (
                    <div key={student.id}>  
                        <h3>{student.name}</h3>
                        <p>{student.marks}</p>
                    </div>
                ))}

                {/* {students.map(student => (
                    <div>
                        <h3>{student.name}</h3>
                    </div>
                ))} */}


            </div>
        </>
    )
}

export default First;