import { CustomTooltip } from '@remix-ui/helper'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import { ISolidityUmlGen } from '../types'
import './css/solidity-uml-gen.css'
export interface RemixUiSolidityUmlGenProps {
  plugin?: ISolidityUmlGen
  updatedSvg?: string
  loading?: boolean
  themeSelected?: string
  themeName: string
}

type ButtonAction = {
  svgValid: () => boolean
  action: () => void
  buttonText: string
  icon?: string
  customcss?: string
}

interface ActionButtonsProps {
  buttons: ButtonAction[]
}

const ActionButtons = ({ buttons }: ActionButtonsProps) => (
  <>
    {buttons.map(btn => (
      <CustomTooltip
        key={btn.buttonText}
        placement="top"
        tooltipText={btn.buttonText}
        tooltipId={btn.buttonText}
      >
        <button
          key={btn.buttonText}
          className={`btn btn-primary btn-sm rounded-circle ${btn.customcss}`}
          disabled={!btn.svgValid}
          onClick={btn.action}
        >
          <i className={`${btn.icon}`}></i>
        </button>
      </CustomTooltip>
    ))}
  </>
)

export function RemixUiSolidityUmlGen ({ plugin, updatedSvg, loading, themeSelected, themeName }: RemixUiSolidityUmlGenProps) {
  const [showViewer, setShowViewer] = useState(false)
  const [svgPayload, setSVGPayload] = useState<string>('')
  const [validSvg, setValidSvg] = useState(false)

  useEffect(() => {
    setValidSvg (updatedSvg.startsWith('<?xml') && updatedSvg.includes('<svg')) 
    setShowViewer(updatedSvg.startsWith('<?xml') && updatedSvg.includes('<svg'))
  }
  , [updatedSvg])

  const buttons: ButtonAction[] = [
    { 
      buttonText: 'Download as PDF',
      svgValid: () => validSvg,
      action: () => console.log('generated!!'),
      icon: 'fa fa-file'
    },
    { 
      buttonText: 'Download as PNG',
      svgValid: () => validSvg,
      action: () => console.log('generated!!!'),
      icon: 'fa fa-picture-o'
    }
  ]

  const encoder = new TextEncoder()
  const data = encoder.encode(updatedSvg)
  const final = btoa(String.fromCharCode.apply(null, data))

  const DefaultInfo = () => (
    <div className="d-flex flex-column justify-content-center align-items-center mt-5">
      <h2 className="h2 align-self-start"><p>To view your contract as a Uml Diragram</p></h2>
      <h3 className="h4 align-self-start"><p>Right Click on your contract file (Usually ends with .sol)</p></h3>
      <h3 className="h4 align-self-start"><p>Click on Generate UML</p></h3>
    </div>
  )
  const Display = () => {
    const invert = themeSelected === 'dark' ? 'invert(0.9)' : 'invert(0)'
    return (
      <div id="umlImageHolder" className="w-100 px-2 py-2 d-flex">
        { validSvg && showViewer ? (
          <TransformWrapper
            initialScale={1}
          >
            {
              ({ zoomIn, zoomOut, resetTransform }) => (
                <Fragment>
                  <div className="position-absolute bg-transparent rounded p-2" id="buttons"
                    style={{ zIndex: 3,  top: '10', right: '2em' }}
                  >
                    <button className="btn btn-outline-info btn-sm rounded-circle mr-1" onClick={() => resetTransform()}>
                      <i className="far fa-arrow-to-bottom"></i>
                    </button>
                    <button className="btn btn-outline-info btn-sm rounded-circle mr-1" onClick={() => zoomIn()}>
                      <i className="far fa-plus"></i>
                    </button>
                    <button className="btn btn-outline-info btn-sm rounded-circle mr-1" onClick={() => zoomOut()}>
                      <i className="far fa-minus"></i>
                    </button>
                    <button className="btn btn-outline-info btn-sm rounded-circle mr-1" onClick={() => resetTransform()}>
                      <i className="far fa-arrow-circle-left"></i>
                    </button>
                  </div>
                  <TransformComponent contentStyle={{ zIndex: 2 }}>
                    <img
                      id="umlImage"
                      src={`data:image/svg+xml;base64,${final}`}
                      width={'100%'}
                      height={'auto'}
                      className="position-relative"
                    />
                  </TransformComponent>
                </Fragment>
              )
            }
          </TransformWrapper>
        ) : loading ? <div className="justify-content-center align-items-center d-flex  mx-auto my-auto">
            <i className="fas fa-spinner fa-spin fa-4x"></i>
          </div> : <DefaultInfo />}
      </div>
  )}
  return (<>
    { <Display /> }
    </>
  )
}

export default RemixUiSolidityUmlGen