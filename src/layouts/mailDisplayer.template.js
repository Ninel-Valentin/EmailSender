import { Consts } from "../Consts";

export default function mailDisplay(headers, content) {

    var content = [
        {
            "sender": "dummy_sender",
            "title": "testTitle",
            "summary": "some text goes here as content",
            "sentAt": "10:36",
        },
        {
            "sender": "dummy_sender",
            "title": "testTitle",
            "summary": "some text goes here as content",
            "sentAt": "09:13",
        },
        {
            "sender": "dummy_sender",
            "title": "testTitle",
            "summary": "some text goes here as content",
            "sentAt": "08:58",
        }
    ];

    function ArchiveMail(e) {
        // get id from email and archive it
        console.log('email archived');
    }

    function Un_ReadMail(e, isRead) {
        // get id from email check if read/unread and mark it other-way
        console.log('email read/unread');
    }

    function DeleteMail(e) {
        // get id from email and delete it
        console.log('email deleted');
    }

    function ClearSection(e) {
        // Handle unwanted events (hovering over buttons)
        if (e.target.tagName !== 'TD')
            return;

        let parentCell = e.target.parentNode.querySelector('td[data-type="icon"]');
        // Clear children
        parentCell.innerHTML = '';
        return parentCell;
    }

    function RevealImages(e, isRead) {
        let parent = ClearSection(e);
        let container = document.createElement('div');
        container.className = 'buttonsContainer';
        Consts.iconButtons.forEach(icon => {
            let iconBtn = document.createElement('div');
            let addition = icon.includes('read') && isRead ? 'un' : '';
            iconBtn.className = `${addition}${icon}`;


            switch (icon) {
                case 'archive':
                    iconBtn.onclick = (e) => {
                        ArchiveMail(e);
                    };
                    break;
                case 'readEmail':
                    iconBtn.onclick = (e) => {
                        Un_ReadMail(e, isRead);
                    };
                    break;
                case 'bin':
                    iconBtn.onclick = (e) => {
                        DeleteMail(e);
                    };
                    break;
                default:
                    console.log(`AN ISSUE WAS ENCOUNTERED, PLEASE REPORT THIS PROBLEM`);
            }

            container.appendChild(iconBtn);
        });
        parent.appendChild(container);
    }

    function HideImages(e) {
        let parent = ClearSection(e);
        parent.innerText = parent.getAttribute('data-sent-at');
    }

    function GenerateRow(data) {
        return (
            <>
                <tr
                    onMouseEnter={(e) => {
                        RevealImages(e, false); //TODO: Add logic to send if it is read or not
                    }}
                    onMouseLeave={(e) => {
                        HideImages(e);
                    }}
                >
                    <td data-type="sender">
                        <div className="tableDataContainer">
                            <p>{data.sender}</p>
                        </div>
                    </td>
                    <td data-type="summary">
                        <div className="tableDataContainer">
                            <p><b>{data.title}</b> - {data.summary}</p>
                        </div>
                    </td>
                    <td data-type="icon"
                        data-sent-at={data.sentAt}>
                        {data.sentAt}
                    </td>
                </tr>
            </>
        );
    }

    return (
        <>
            <h2>Title</h2>
            <table className="inbox">
                <tbody>
                    {content.map(row => GenerateRow(row))}
                </tbody>
            </table>
        </>
    );
};