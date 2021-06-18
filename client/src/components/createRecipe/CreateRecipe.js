import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { IoMdArrowDropup, IoMdArrowDropdown } from 'react-icons/io';

import './createRecipe.css';
import { useHistory } from 'react-router';
import { startCreateRecipe } from '../../actions/recipes';


export default function CreateRecipe() {

    const [form, setForm] = useState({
        title: '',
        summary: '',
        spoonacularScore: 0,
        healthScore: 0,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        analyzedInstructions: [{
            steps: []
        }]
    });

    const [searchInput, setSearchInput] = useState('');
    const [steps, setSteps] = useState([]);
    const [showSelect, setShowSelect] = useState(false);
    const [filteredDiets, setFilteredDiets] = useState([]);
    const [selectedDiets, setSelectedDiets] = useState([]);
    const [dietsCompare, setDietsCompare] = useState([]);


    const history = useHistory();
    const dispatch = useDispatch();

    const diets = useSelector(state => state.diets.dietsLoaded);

    const { title, summary, spoonacularScore, healthScore, vegetarian, vegan, glutenFree, analyzedInstructions } = form;

    useEffect(() => {
        window.addEventListener('click', openCloseListListener);
        return () => window.removeEventListener('click', openCloseListListener);
    }, []);

    const openCloseListListener = (event) => {
        if (event.target.id !== 'diets-selection') {
            setShowSelect(false)
        }
    };

    useEffect(() => {
        filterDiets();
    }, [searchInput, dietsCompare]);


    useEffect(() => {
        setSteps();
    }, [steps]);


    const handleForm = (e) => {
        if (["step"].includes(e.target.className)) {
            let stepsCopy = [...form.analyzedInstructions[0].steps];
            stepsCopy[Number(e.target.dataset.id) - 1][e.target.className] = e.target.value;
            setForm({ ...form }, stepsCopy);
        } else {
            const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
            if (e.target.type === 'checkbox') {
                handleFilterDiets(e);
            }
            setForm({
                ...form,
                [e.target.name]: value
            });
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        if(!title || !summary) return;

        const recipe = {
            ...form,
            diets: selectedDiets.map(sd => sd.id)
        }

        dispatch(startCreateRecipe(recipe));

        history.push('/recipes');
    };


    const filterDiets = () => {
        setFilteredDiets(diets.filter((d) => (d.name.toLowerCase().includes(searchInput.toLowerCase()) && !dietsCompare.includes(d.id))));
    };


    const handleFilterDiets = (e) => {
        if (e.target.type !== 'checkbox') {
            setSelectedDiets([...selectedDiets, JSON.parse(e.target.value)]);
            setDietsCompare([...dietsCompare, JSON.parse(e.target.value).id]);
            setSearchInput('');

            let dietCheck = document.getElementById(JSON.parse(e.target.value).name);
            if (dietCheck) dietCheck.checked = true;
            // if (dietCheck) dietCheck.value = true;
            // dietCheck?.click();
            // checkUncheckDiet(JSON.parse(e.target.value).id);
            form[dietCheck?.name] = true;
        } else {
            let diet = diets.find(d => d.name === e.target.id);
            if (e.target.checked) {
                let alreadySelected = selectedDiets.find(sd => sd.name === diet.name);
                if (!alreadySelected) {
                    setSelectedDiets([...selectedDiets, diet]);
                    setDietsCompare([...dietsCompare, diet.id]);
                }
            } else {
                handleRemoveDiet(diet.id);
            }
        }
    };


    const checkUncheckDiet = (dietId) => {
        let diet = diets.find(d => d.id === dietId);
        let dietCheck = document.getElementById(diet.name);
        if (dietCheck) dietCheck.checked = false;
    };


    const handleRemoveDiet = (dietId) => {
        setSelectedDiets(selectedDiets.filter(d => d.id !== dietId));
        setDietsCompare(dietsCompare.filter(d => d !== dietId));

        checkUncheckDiet(dietId);
    };


    const handleAddStep = () => {
        analyzedInstructions[0].steps.push({
            number: analyzedInstructions[0].steps.length + 1,
            step: ''
        });

        setSteps(analyzedInstructions[0].steps);

        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    };

    const handleRemoveStep = (number) => {
        analyzedInstructions[0].steps.splice(number - 1, 1);
        analyzedInstructions[0].steps.map((s, i) => s.number = i + 1);
        setSteps(analyzedInstructions[0].steps);
    };


    const moveUp = (position) => {
        if (analyzedInstructions[0].steps[position - 2]) {

            let change1 = document.getElementById(position);
            let change2 = document.getElementById(position - 1);

            change1.classList.add('swapping');
            change2.classList.add('swapping');
            setTimeout(() => {
                change1.classList.remove('swapping');
                change2.classList.remove('swapping');
            }, 500);

            let aux;
            aux = analyzedInstructions[0].steps[position - 1];
            analyzedInstructions[0].steps[position - 1] = analyzedInstructions[0].steps[position - 2];
            analyzedInstructions[0].steps[position - 2] = aux;
            setSteps(analyzedInstructions[0].steps.map((s, i) => s.number = i + 1));
        }
    };

    const moveDown = (position) => {
        if (analyzedInstructions[0].steps[position]) {

            let change1 = document.getElementById(position);
            let change2 = document.getElementById(position + 1);

            change1.classList.add('swapping');
            change2.classList.add('swapping');
            setTimeout(() => {
                change1.classList.remove('swapping');
                change2.classList.remove('swapping');
            }, 500);

            let aux;
            aux = analyzedInstructions[0].steps[position - 1];
            analyzedInstructions[0].steps[position - 1] = analyzedInstructions[0].steps[position];
            analyzedInstructions[0].steps[position] = aux;
            setSteps(analyzedInstructions[0].steps.map((s, i) => s.number = i + 1));
        }
    };


    return (
        <div className="container">
            <h1>New recipe</h1>

            <form onChange={handleForm} onSubmit={handleFormSubmit} className="formCreate">



                <div className="inputWithDiets">

                    <div className="inputsContainer">

                        <div className="form-group">
                            <label className="form-label" htmlFor="title">Title: </label>
                            <input max="60" onChange={handleForm} value={title} type="text" autoComplete="off" autoFocus className="form-input" name="title" id="title"></input>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="summary">Summary: </label>
                            <textarea onChange={handleForm} value={summary} type="text" className="form-input" name="summary" id="summary"></textarea>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="spoonacularScore">Spoonacular Score: </label>
                            <input onChange={handleForm} min="0" max="100" style={{ textAlign: "center" }} value={spoonacularScore} type="number" className="form-input" name="spoonacularScore" id="spoonacularScore"></input>
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="healthScore">Health Score: </label>
                            <input onChange={handleForm} min="0" max="100" style={{ textAlign: "center" }} value={healthScore} type="number" className="form-input" name="healthScore" id="healthScore"></input>
                        </div>

                        {analyzedInstructions[0].steps.length === 0 && <div className="form-group">
                            <label className="form-label" htmlFor="analyzedInstructions">Instructions: </label>
                            <button onClick={handleAddStep} type="button">ADD STEP</button>
                        </div>}

                    </div>


                    <div className="searchDietContainer">

                        <h3>Select diet types</h3>

                        <div   onClick={() => setShowSelect(true)} className="inputWithButtonContainer">
                            <input onChange={(e) => setSearchInput(e.target.value)} value={searchInput} autoComplete="off" className="inputDatalist" id="diets-selection" name="diets-selection" placeholder="Search and select" />
                            {searchInput !== '' && <span onClick={() => setSearchInput('')}>x</span>}
                        </div>

                        <div className="dietsSelectList">
                        {/* searchInput !== '' && */}
                            { showSelect && filteredDiets.length > 0 && <select size={filteredDiets.length + 1} onChange={(e) => handleFilterDiets(e)}>
                                <option style={{ textAlign: 'center' }} value='' disabled defaultValue>Select diet type</option>
                                {filteredDiets.map(diet =>
                                    <option key={diet.id} value={JSON.stringify(diet)}> {diet.name} </option>
                                )}
                            </select>}

                        </div>

                        <div className="dietsSelectedContainer">

                            {
                                selectedDiets?.length > 0 ?

                                    selectedDiets.map(sd => {
                                        return <div key={sd.id} className="dietSelected fadeIn">
                                            <p>{sd.name}</p>

                                            <button onClick={() => handleRemoveDiet(sd.id)} type="button">x</button>

                                        </div>
                                    })
                                    :
                                    <p style={{ textAlign: "center" }}>No diet selected</p>
                            }


                        </div>

                        <div className="checkboxContainer">
                            <div className="checkbox-group">
                                <label htmlFor="vegetarian">Vegetarian</label>
                                <input onChange={handleForm} id="vegetarian" name="vegetarian" value={vegetarian} type="checkbox"></input>
                            </div>
                            <div className="checkbox-group">
                                <label htmlFor="vegan" >Vegan</label>
                                <input onChange={handleForm} id="vegan" name="vegan" value={vegan} type="checkbox"></input>
                            </div>
                            <div className="checkbox-group">
                                <label htmlFor="gluten free" >Gluten Free</label>
                                <input onChange={handleForm} id="gluten free" name="glutenFree" value={glutenFree} type="checkbox"></input>
                            </div>
                        </div>

                    </div>

                </div>

                {analyzedInstructions[0].steps.length > 0 &&
                    <div className="instructionsContainer">
                        <h2>Instructions</h2>
                        {analyzedInstructions[0].steps.map((s, index) =>

                            <div key={s.number} id={s.number} className="stepContainer">
                                <div className="stepHeader">
                                    <div>
                                        <h3>Step {index + 1}</h3>
                                    </div>

                                    <div className="instructionsBtnsContainer">
                                        <div className="upDownBtns">
                                            <button type="button" disabled={s.number === 1}><IoMdArrowDropup onClick={() => moveUp(s.number)} type="button">Mover arriba</IoMdArrowDropup></button>
                                            <button type="button" disabled={s.number === analyzedInstructions[0].steps.length}><IoMdArrowDropdown onClick={() => moveDown(s.number)} type="button">Mover abajo</IoMdArrowDropdown></button>
                                        </div>
                                        <button onClick={() => handleRemoveStep(s.number)} type="button">REMOVE STEP {index + 1}</button>
                                    </div>
                                </div>

                                <textarea onChange={handleForm} name={analyzedInstructions[0].steps[s.number - 1].step} data-id={s.number} className="step" value={analyzedInstructions[0].steps[s.number - 1].step}></textarea>
                            </div>

                        )}

                        <button className="btnAddStep" onClick={handleAddStep} type="button">ADD STEP</button>

                    </div>
                }

                <button type="submit" disabled={!summary || !title}>Create recipe</button>


            </form>
        </div>
    );
}