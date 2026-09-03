export default function CareerTimeliine() {
     
    const items = [
        {date: "2022.03", title: "대학교 입학", description:"대학교에 입학했습니다."},
        {date: "2022.03", title: "1번", description:"1번입니다."},
        {date: "2022.03", title: "2번", description:"2번입니다."},
        {date: "2022.03", title: "3번", description:"3번입니다."}
    ];

    return (
        <div>
            <div>
                <h2>CAREER</h2>
                <h3>지금까지의 여정</h3>
            </div>

            <div className="career">
                {items.map((item, idx) => (
                    <div key={idx}>
                        <p>{item.date}</p>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}