import { useState } from 'react';
import { useEffect } from 'react';
import { Component } from 'react';
import './counter.component.css';

interface RangeState {
    minimum: any;
    maximum: any;
    minimumPrevState: any;
    maximumPrevState: any;
    count: any;
}

export default function CounterComponent() {
    const [ min, setMin ] = useState(1)
    const [ max, setMax ] = useState(1000)
    const [ minimumPrevState, setMinimumPrevState ] = useState(1)
    const [ maximumPrevState, setMaximumPrevState ] = useState(1000)
    const [ count, setCount ] = useState('1')
    const editMinimum = (value: any) => {
        setMin(value)
    }
    const editMaximum = (value: any) => {
        setMax(value)
    }
    const focusOut = (value: any) => {
        if (isNaN(value) || value === '') {
            setMax(1000)
            setMin(1)
        }
        if(parseInt(value) < max) setMin(value)
        if(parseInt(value) > min) setMax(value);
        setCount(min.toString())
    }
    const focusOutOfComponent = (value: any) => {
        if (isNaN(parseInt(count)) || count.toString() === '') {
            setCount(min.toString())
        }
        console.log('JJ :: ', value)
        if(parseInt(value) <= max && parseInt(value) >= min) setCount(value)
        else setCount(min.toString())
    }
    const checkIfWithinRangeAndSet = (value: any) => {
        setCount(value.toString())
    }

    const incrementOrDecrement = (value: any) => {
        if((parseInt(count.toString()) + parseInt(value) <= max) && (parseInt(count.toString()) + parseInt(value) >= min)) {
            setCount((parseInt(count.toString()) + parseInt(value.toString())).toString());
        }
    }
    const counterProps = {
        count: count.toString(),
        incrementOrDecrement: incrementOrDecrement,
        checkIfWithinRangeAndSet:checkIfWithinRangeAndSet,
        focusOutOfComponent: focusOutOfComponent,
    }

    useEffect(() => {
    })

    return (
        <>
            <div>
                <ActualCounterComponent {...counterProps}></ActualCounterComponent>
            </div>
            <div className="rangeeditor">
                Please set your minimum:&nbsp;
                <input type="text" name="minimum" id="minimum" value={min} onBlur={ e => focusOut(e.target.value) } onChange={ e => editMinimum(e.target.value) }/>
                &nbsp;and maximum:&nbsp;
                <input type="text" name="maximum" id="maximum" value={max} onBlur={ e => focusOut(e.target.value) } onChange={ e => editMaximum(e.target.value) }/>
                &nbsp;ranges
            </div>
        </>
    )
}

const ActualCounterComponent = (props: { count: string, incrementOrDecrement: any, checkIfWithinRangeAndSet: any, focusOutOfComponent: any }) => {
    const [ count, setCount ] = useState('')

    useEffect(() => {
        console.log(props.count)
        setCount(props.count.toString())
      });
    return (
        <div className="counter-component">
            <div className="counter-component__button left" onClick={() => props.incrementOrDecrement(-1)}>-</div>
            <div className="counter-component__input"><input value={count} onChange={ e => props.checkIfWithinRangeAndSet(e.target.value.toString()) } onBlur={e => props.focusOutOfComponent(e.target.value.toString())} style={{width: '50px', height: '50px'}} id="inputT" type="text" /></div>
            <div className="counter-component__button right" onClick={() => props.incrementOrDecrement(1)}>+</div>
        </div>
    )
}


