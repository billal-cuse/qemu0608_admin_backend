import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {Radio} from "antd";
import {DecreaseIndentIcon, IncreaseIndentIcon, JustifyCenter, JustifyLeft, JustifyRight} from "../icons";
import {FORMAT_ELEMENT_COMMAND, FORMAT_TEXT_COMMAND, INDENT_CONTENT_COMMAND, OUTDENT_CONTENT_COMMAND} from "lexical";


function ToolBar() {

    const [editor] = useLexicalComposerContext();

    return (
        <div className={"flex gap-3 items-center w-full justify-end"}>

            <Radio.Group
                className={"align-group"}
                style={{
                    fontWeight: "bold",
                }}>
                <Radio.Button value="bold"
                              onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold")}>B</Radio.Button>
                <Radio.Button
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic")}
                    style={{
                        fontStyle: "italic",
                    }} value="italic">I</Radio.Button>
                <Radio.Button
                    onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline")}
                    style={{
                        textDecoration: "underline",
                    }}
                    value="underline">U</Radio.Button>

            </Radio.Group>

            <Radio.Group className={"flex align-group"} style={{
                fontWeight: "bold",
            }}>
                <Radio.Button
                    className={"flex items-center"}
                    onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "left")}
                    value="start"><JustifyLeft/></Radio.Button>
                <Radio.Button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "center")} className={"flex items-center"} value="center"><JustifyCenter/></Radio.Button>
                <Radio.Button onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, "right")} className={"flex items-center"} value="end"><JustifyRight/></Radio.Button>
            </Radio.Group>


            <Radio.Group className={"flex align-group"}
                         style={{
                             fontWeight: "bold",
                         }}>
                <Radio.Button
                    onClick={() => editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined)}
                    className={"flex items-center"} value="increase">
                    <IncreaseIndentIcon/>
                </Radio.Button>
                <Radio.Button
                    onClick={() => editor.dispatchCommand(OUTDENT_CONTENT_COMMAND, undefined)}

                    className={"flex items-center"}value="decrease">
                    <DecreaseIndentIcon/>
                </Radio.Button>
            </Radio.Group>
        </div>
    );
}

export default ToolBar;