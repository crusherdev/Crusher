import { EditPencilIcon, ReselectPointerIcon } from "electron-app/src/_ui/icons";
import React from "react";
import { css } from "@emotion/react";
import { getSavedSteps, getStepInfo } from "electron-app/src/store/selectors/recorder";
import { useSelector, useDispatch } from "react-redux";
import { TextHighlighter, transformStringSelectorsToArray } from "./helper";
import { deleteRecordedSteps, updateRecordedStep } from "electron-app/src/store/actions/recorder";
import { FieldInput, FieldSelectorPicker } from "electron-app/src/ui/components/sidebar/stepEditor/fields";
import { ActionsInTestEnum } from "@shared/constants/recordedActions";
import { NormalInput } from "electron-app/src/_ui/components/inputs/normalInput";
import { emitShowModal } from "electron-app/src/ui/components/modals";
import { BrowserButton } from "electron-app/src/ui/components/buttons/browser.button";
import { Button } from "@dyson/components/atoms";
import { iSelectorInfo } from "@shared/types/selectorInfo";
import { sendSnackBarEvent } from "electron-app/src/ui/components/toast";

const limitString = (string) => {
    if (string.length > 25) {
        return string.substring(0, 30) + "...";
    }
    return string;
}

const SelectorInfo = ({stepId, setShowAdvanced}) => {
    const stepInfo = useSelector(getStepInfo(stepId));

    return (
        <div css={selectorInfoContainerCss}>
            <div className={"flex items-center"}>
                <div>
                    <span>main selector:</span>
                    <span onDoubleClick={setShowAdvanced.bind(this, true)} css={mainSelectorCss} className={'font-medium'}>{limitString(stepInfo.description)}</span>
                </div>

                <EditPencilIcon onClick={setShowAdvanced.bind(this, true)} className={"ml-10"} css={pencilIconCss} />
                <FieldSelectorPicker className={"ml-10"}/>
            </div>
            <div css={selectorExtraCss} className={"mt-7"}>
                .class-name, etc, and 24 other
            </div>
        </div>
    )    
};

const reselectIconCss = css`
    width: 10rem;
    height: 12rem;
    :hover {
        opacity: 0.8;
    }
`;

const selectorExtraCss = css`
    font-size: 12rem;
`;
const mainSelectorCss = css`
    color: rgba(255, 255, 255, 0.89);
`;
const selectorInfoContainerCss = css`

font-family: 'Gilroy';
font-style: normal;
font-weight: 400;
font-size: 13rem;

color: rgba(255, 255, 255, 0.54);

`;

const pencilIconCss = css`width: 10.5rem; height: 10.5rem; margin-top: -2rem; :hover { opacity: 0.8; } `;

const InputValueEditor = ({step, stepId}) => {
    const [isEditMode, setIsEditMode] = React.useState(false);
    const inputRef = React.useRef(null);
    const dispatch = useDispatch();
    
    const getInfo = (step) => {
        if(step.type === ActionsInTestEnum.ADD_INPUT) {
            const updateInputValue = (value: string) => {
                if (step.payload.meta.value.value !== value) {
                    step.payload.meta.value.value = value;
                    dispatch(updateRecordedStep({ ...step }, stepId));
                    sendSnackBarEvent({ type: "success", message: "Value updated" });
                }
            };
  
            const inputValue = step.payload.meta?.value?.value || "";
            return { label: "Value:", value: inputValue, placeholder: "Enter value", updateCallback: updateInputValue };
        }
        if([ActionsInTestEnum.NAVIGATE_URL, ActionsInTestEnum.WAIT_FOR_NAVIGATION].includes(step.type)) {
            const updateNavigationUrlValue = (value: string) => {
                if (step.payload.meta.value !== value) {
                    step.payload.meta.value = value;
                    dispatch(updateRecordedStep({ ...step }, stepId));
                    sendSnackBarEvent({ type: "success", message: "Navigation value updated" });
                }
            };

            const navigationUrlValue = step.payload.meta?.value || "";
            return { label: "URL:", value: navigationUrlValue, placeholder: "Enter url", updateCallback: updateNavigationUrlValue};
        }

        return null;
    };

    const fieldInfo = getInfo(step);
    const handleUpdate = () => {
        fieldInfo.updateCallback(inputRef.current.value);
        setIsEditMode(false);
    };
    if(!fieldInfo) return null;
    
    return (
        <div className={'flex items-center mt-20'}>
        <div css={labelCss} className={"mr-7"}>{ fieldInfo.label }</div>
        <span onDoubleClick={() => { setIsEditMode(true); setTimeout(() => { inputRef.current.focus(); document.execCommand('selectAll',false,null); }, 50); }}>
            <NormalInput
                placeholder={fieldInfo.placeholder}
                size={"small"}
                initialValue={fieldInfo.value}
                inputWrapperCss={css`height: unset !important;`}
                onReturn={handleUpdate.bind(this, false)}
                onBlur={setIsEditMode.bind(this, false)}
                inputCss={inputCss(isEditMode)}
                disabled={!isEditMode}
                ref={inputRef}
            />
        </span>
    

        <EditPencilIcon onClick={setIsEditMode.bind(this, true)} className={"ml-10"} css={editUrlIconCss} />
    </div>
    )
};

const StepMetaInfo = ({stepId, setShowAdvanced}) => {
    const steps = useSelector(getSavedSteps);
    const stepInfo = useSelector(getStepInfo(stepId));
    const title = TextHighlighter({text: stepInfo.name}, true);


    const hasSelectors = steps[stepId].type.startsWith("ELEMENT");
    const showFieldInput =[ActionsInTestEnum.NAVIGATE_URL, ActionsInTestEnum.WAIT_FOR_NAVIGATION, ActionsInTestEnum.ADD_INPUT].includes(steps[stepId].type);

    return (
        <div css={stepMetaInfoContainerCss} className={"px-20 py-24"}>
            <div css={stepNameCss}>
                { title }
            </div>

            {showFieldInput ? (
               <InputValueEditor stepId={stepId} step={steps[stepId]}/>
            ) : ""}

            {hasSelectors ? (
                <div className={'flex mt-35'}>
                   <SelectorInfo setShowAdvanced={setShowAdvanced} stepId={stepId}/>
                   {/* <div css={uniqueCss} className={"ml-auto"}>
                       <span css={css`color: rgba(148, 111, 255, 0.99);`}>90%</span> unique
                   </div> */}
               </div>
            ): ""}

            <div css={metaInfoFooterCss} className={`flex ${hasSelectors || showFieldInput ? "mt-52" : "mt-30"}`}>
                <div>took 1.9 sec</div>
                {/* <div className={"ml-auto"}>view logs</div> */}
            </div>
        </div>
    )
};
const editUrlIconCss = css`width: 11rem; height: 11rem; margin-top: -2rem; :hover { opacity: 0.8; } `;

const labelCss = css`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 13rem;
    color: rgba(215, 223, 225, 0.6);
`;
const inputCss = (isEditMode) => css`
        font-family: 'Gilroy' !important;
        font-style: normal !important;
        font-weight: 400 !important;
        font-size: 13rem !important;
        color: rgba(255, 255, 255, 0.93) !important;
        width: 159rem !important;
        padding: 12.5rem 9rem !important;
        border-radius: 8rem !important;
        height: 26rem !important;
        background: ${!isEditMode ? "transparent !important" : "rgba(77, 77, 77, 0.25) !important"};
        border-width: ${!isEditMode ? "0rem !important" : "0.5rem !important"};
`;
const metaInfoFooterCss = css`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 12rem;

    color: rgba(255, 255, 255, 0.56);

`;

const uniqueCss = css`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 700;
    font-size: 13rem;

    color: rgba(215, 223, 225, 0.6);
`;
const stepNameCss = css`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 500;
    font-size: 15rem;
`;
const stepMetaInfoContainerCss = css`
    background: rgb(5, 5, 5);
`;

// Actions map with modal types
const EDIT_MODE_MAP = {
	[ActionsInTestEnum.WAIT]: "WAIT",
	[ActionsInTestEnum.VALIDATE_SEO]: "SHOW_SEO_MODAL",
	[ActionsInTestEnum.CUSTOM_CODE]: "CUSTOM_CODE",
	[ActionsInTestEnum.RUN_AFTER_TEST]: "RUN_AFTER_TEST",
	[ActionsInTestEnum.ASSERT_ELEMENT]: "SHOW_ASSERT_MODAL",
	[ActionsInTestEnum.CUSTOM_ELEMENT_SCRIPT]: "SHOW_CUSTOM_SCRIPT_MODAL",
};

const StepAdvancedForm =  ({stepId}) =>{
    const textAreaRef = React.useRef(null);
    const steps = useSelector(getSavedSteps);
    const stepInfo = useSelector(getStepInfo(stepId));
    const title = TextHighlighter({text: stepInfo.name}, true);
    const step = steps[stepId];

    const dispatch = useDispatch();

    const getReadbleSelectors = (selectors: Array<iSelectorInfo> | null) => {
        if (!selectors) return "";
    
        return selectors
            .map((selector, index) => {
                return selector.value;
            })
            .join("\n");
    };

    const handleOnSelectorsPicked = (selectors: Array<iSelectorInfo>, shouldNotify = true) => {
		step.payload.selectors = selectors;
		dispatch(updateRecordedStep({ ...step }, stepId));
		if (shouldNotify) {
			sendSnackBarEvent({ type: "success", message: "Selectors updated" });
		}
	};
	const saveSelectorsOnUserInput = (e) => {
		handleOnSelectorsPicked(transformStringSelectorsToArray(e.target.value), false);
	};

    return (
        <div className={"px-20 py-24"} css={[stepMetaInfoContainerCss]}>
            <div css={stepNameCss}>
                { title }
            </div>

            <div className={"flex mt-34"}>
                <textarea onChange={saveSelectorsOnUserInput} ref={textAreaRef} css={textAreaCss}>
                    {getReadbleSelectors(steps[stepId].payload.selectors)}
                </textarea>
                <div className={"ml-24"}>
                    <ul css={actionsListCss}>
                        <li>choose selector</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}

const textAreaCss = css`
    background: rgba(217, 217, 217, 0.05);
    border: 0.5px solid #212121;
    border-radius: 10rem;
    padding: 13rem 15rem;
    height: 132rem;
    width: 68%;
    resize: none;
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 12rem;


    color: rgba(255, 255, 255, 0.54);

`;

const StepEditor = ({stepId}) => {
    const [showAdvanced, setShowAdvanced] = React.useState({show: false, containerHeight: null});
    const containerRef = React.useRef(null);

    const stepInfo = useSelector(getStepInfo(stepId));
    const steps = useSelector(getSavedSteps);
    const dispatch = useDispatch();
    const showPreview = ![ActionsInTestEnum.SET_DEVICE, ActionsInTestEnum.RUN_AFTER_TEST].includes(steps[stepId].type);

    const step = steps[stepId];
    const shouldShowEditButton = Object.keys(EDIT_MODE_MAP).includes(step.type);

    const handleDelete = () => {
        dispatch(deleteRecordedSteps([stepId]));
    };
	const handleEditModeClick = () => {
		emitShowModal({
			type: EDIT_MODE_MAP[step.type],
			stepIndex: stepId,
		});
	};

    const handleShowAdvanced = (shouldShow) => {
        if(shouldShow)
            setShowAdvanced({show: true, containerHeight: containerRef.current.clientHeight});
        else 
            setShowAdvanced({show: false, containerHeight: null});
    };

    return (
        <div onContextMenu={(e) => e.preventDefault()} css={containerCss} style={{ height: showAdvanced.containerHeight ? showAdvanced.containerHeight + "px" : "auto" }} ref={containerRef}>
            {showAdvanced.show ? (<>
                    <StepAdvancedForm stepId={stepId}/>
            </>) : (
                <>
                    <StepMetaInfo setShowAdvanced={handleShowAdvanced} stepId={stepId}/>
                    <div className={"px-20 py-24"} css={stepMainContentCss}>
                        {false && showPreview ? (
                            <div className="flex">
                                    <div css={elementImageCss}>
                
                                    </div>
                                    <div className={"ml-auto"}>
                                        <ul css={actionsListCss}>
                                            <li>modify url</li>
                                        </ul>
                                    </div>
                            </div>
                        ) :""}
            
                        {
                            shouldShowEditButton ? 
                                (
                                    <Button onClick={handleEditModeClick.bind(this)} bgColor="tertiary-outline" css={buttonCss}>
                                        Open edit
                                    </Button>
                                )
                            : ""
                        }
                        <div className={"mt-28 flex justify-end"}>
                            <div onClick={handleDelete} css={deleteCss}>delete</div>
                        </div>
                    </div>
                </>
            )}
           
        </div>
    )
};
const buttonCss = css`
	background: #B341F9!important;
	font-size: 14rem;
	box-sizing: border-box;
	border-radius: 8rem !important;
	height: 36rem;
    width: 114rem;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
`;
const deleteCss = css`
    font-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 12rem;
    color: #DB6E82;
    :hover {
        opacity: 0.8;
    }
`;
const actionsListCss = css`
    ont-family: 'Gilroy';
    font-style: normal;
    font-weight: 400;
    font-size: 12rem;

    color: rgba(255, 255, 255, 0.53);

    li {
        :hover {
            text-decoration: underline;
            opacity: 0.8;
        }
    }
`;
const elementImageCss = css`
    width: 255rem;
    height: 172rem;
    background: rgba(128, 128, 128, 0.8);
    border-radius: 17rem;
`;
const stepMainContentCss = css`
    background: rgb(11, 11, 11);
`;

const containerCss = css`
    width: 412rem;
`;

export { StepEditor };