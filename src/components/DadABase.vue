<template data-app>    
    <v-container>
        <v-row>
            <v-col>
                <v-app-bar style="background-color: darkcyan;">
                    <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
                    <v-toolbar-title>
                        <v-row>
                            <v-col cols="auto" justify-start style="padding:25px;">
                                <h1>
                                    Dad-A-Base
                                </h1>                
                            </v-col> 
                            <v-col cols="auto">
                                <div font-size="20px;" style="margin-top: 25px;">
                                    The Dad Joke Database
                                </div>                
                            </v-col>
                            <v-col cols="auto" style="padding:35px;">
                                <input type="file" accept=".csv" @change="handleFileUpload( $event )"/>                                
                            </v-col>                            
                        </v-row>                
                    </v-toolbar-title>
                </v-app-bar>
                <v-navigation-drawer
                    v-model="drawer"
                    absolute
                    bottom
                    temporary
                    color="#B3E5FC"                    
                    >
                    <v-list
                        rounded                                                
                    >
                        <v-list-item-group
                        v-model="group"
                        active-class="deep-purple--text text--accent-4"
                        >
                            <v-list-item class="navTitle">
                                <v-list-item-title @click="navPage('Home')" style="font-size: 25px;">Home</v-list-item-title>
                            </v-list-item>

                            <v-list-item class="navTitle">
                                <v-list-item-title @click="navPage('Analysis')" style="font-size: 25px;">Analysis</v-list-item-title>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                    </v-navigation-drawer>
            </v-col>
        </v-row>        
        <v-row :style="homeState">
            <v-col>
                <v-sheet>
                    <v-row>
                        <v-col cols="auto">
                            <v-sheet style="margin-top:25px;">
                                <v-btn rounded elevation="2" @click="getJoke()">
                                    <v-icon left>
                                        mdi-emoticon-excited-outline
                                    </v-icon>
                                    Random Joke
                                </v-btn>
                            </v-sheet>
                        </v-col>
                        <v-col>
                            <v-card>
                                <v-card-title>Random Dad Joke</v-card-title>
                                <v-card-text style="font-size: 25px; font-weight: bold; color: black;">"{{currentDadJoke}}"</v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>                    
                </v-sheet>
            </v-col>
        </v-row>
        <v-row :style="homeState">
            <v-col>
                <v-card>
                    <v-card-title style="font-size: 50px;">
                        Dad-A-Table
                        <v-spacer></v-spacer>
                        <v-text-field
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table
                        :headers="headers"
                        :items="items"
                        :search="search"
                        id="jokeTable"
                    >
                        <template v-slot:item="row">                            
                            <tr>
                                <td @click="highlightJoke(row.item)">{{row.item.Joke}}</td>
                                <td @click="highlightJoke(row.item)">{{row.item.Subject}}</td>
                                <td @click="highlightJoke(row.item)" style="text-align:center">{{row.item.CringeLevel}}</td>
                                <td @click="highlightJoke(row.item)" style="text-align:center">{{row.item.Popularity}}</td>
                                <td class="d-flex justify-center">
                                    <v-btn class="mx-2" fab dark small @click="onUpVote(row.item)" style="color:aquamarine; margin-right: 5px;">
                                        <v-icon>mdi-thumb-up</v-icon>
                                    </v-btn>                                            
                                    <v-btn class="mx-2" fab dark small color="pink" @click="onDownVote(row.item)" style="color:tomato;">
                                        <v-icon>mdi-thumb-down</v-icon>
                                    </v-btn>                                    
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>         
            <v-col cols="auto">
                <v-dialog
                v-model="dialog"
                width="50%"
                >
                <v-card style="border-radius: 10px;">
                    <v-card-title style="font-size: 30px; background-color:lightskyblue">
                        Jokes-R-Us
                    </v-card-title>
                    <v-sheet>
                        <v-row style="text-align: center; font-size: 35px; margin: 0px;">
                            <v-col>
                                Subject 
                                <v-divider></v-divider>
                                {{jokeDialog.Subject}}
                            </v-col>
                            <v-col>
                                Cringe Level 
                                <v-divider></v-divider>
                                <v-rating
                                    empty-icon="mdi-star-outline"
                                    full-icon="mdi-star"
                                    half-icon="mdi-star-half-full"
                                    hover
                                    length="5"
                                    size="35"
                                    readonly
                                    :value=parseInt(jokeDialog.CringeLevel)
                                ></v-rating>
                            </v-col>
                            <v-col>
                                Popularity 
                                <v-divider></v-divider>
                                {{jokeDialog.Popularity}}
                            </v-col>
                        </v-row>                    
                    </v-sheet>                    
                    <v-spacer></v-spacer>
                    <v-card-text style="margin-top: 10px; font-size: 25px; color:black;">                        
                        {{jokeDialog.Joke}}
                    </v-card-text>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn
                            color="primary"
                            text
                            @click="dialog = false"
                        >
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
                </v-dialog>
            </v-col>   
        </v-row>
        <v-spacer style="height:50px;"></v-spacer>
        <v-row :style="analysisState">
            <v-container>
                <v-row>
                    <v-col>
                        <v-card>
                            <v-card-title style="font-size: 30px; background-color:lightskyblue">Popularity By Subject</v-card-title>
                            <v-list style="font-size: 20px;">
                                <v-list-item
                                    v-for="item in subjectPopItems"
                                    :key="item.subject"                                    
                                >
                                
                                    <v-list-item-content>
                                        <v-list-item-title class="listStyle" v-text="item.subject" style="text-align:right;"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-divider vertical></v-divider>
                                    <v-list-item-content>
                                        <v-list-item-title class="listStyle" v-text="item.total" style="text-align:left;"></v-list-item-title>
                                    </v-list-item-content>
                                    
                                </v-list-item>                                
                            </v-list>                            
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card>
                            <v-card-title style="font-size: 30px; background-color:lightskyblue">Popularity? By Cringe</v-card-title>
                            <v-list>
                                <v-list-item
                                    v-for="item in cringPopItems"
                                    :key="item.cringeLevel"                                    
                                >
                                    <v-list-item-content>
                                        <v-list-item-title class="listStyle" v-text="item.cringeLevel" style="text-align:right;"></v-list-item-title>
                                    </v-list-item-content>
                                    <v-divider vertical></v-divider>
                                    <v-list-item-content>
                                        <v-list-item-title class="listStyle" v-text="item.total" style="text-align:left;"></v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-col>
                </v-row>
            </v-container>
        </v-row>                        
    </v-container>
</template>

<script>
    export default {
        name: 'DadABase',
        props: {            
        },
        mounted() {
        },  
        methods: {
            navPage(page) {
                switch(page) {
                    case 'Home':
                        this.homeState = "display:  block";
                        this.analysisState = "display:  none";
                        break;
                    case 'Analysis':
                        this.homeState = "display:  none";
                        this.analysisState = "display:  block";                        
                        break;
                    default:
                        // code block
                }
            },            
            handleFileUpload( event ){
                this.file = event.target.files[0];
                this.$papa.parse(this.file, {
                    delimiter: ",",
                    header: true,
                    skipEmptyLines: true,
                    transformHeader:function(h) { return h.replace(/\s/g, ''); },
                    complete: function( results ){
                        console.log("Finished parsing");
                        this.content = results;
                        this.isLoading = false;                        
                    }.bind(this)
                });                
            },
            onUpVote(row) {
                if(row.Popularity == undefined)
                {
                    row.Popularity = 0;                    
                }
                row.Popularity += 1;   
                this.subjectPopItems.forEach(popSub => {
                    if(popSub.subject === row.Subject)
                    {
                        popSub.total++;
                    }                    
                });
                this.cringPopItems.forEach(popCringe => {
                    if(popCringe.cringeLevel === row.CringeLevel)
                    {
                        popCringe.total++;
                    }                    
                });
            },            
            onDownVote(row) {
                if(row.Popularity == undefined)
                {
                    row.Popularity = 0;                    
                    this.subjectPopItems.forEach(popSub => {
                        if(popSub.subject === row.Subject)
                        {
                            popSub.total = 0;
                        }                    
                    });
                    this.cringPopItems.forEach(popCringe => {
                        if(popCringe.cringeLevel === row.CringeLevel)
                        {
                            popCringe.total = 0;
                        }                    
                    });
                }
                else if(row.Popularity != 0)
                {
                    row.Popularity -= 1;                         
                    this.subjectPopItems.forEach(popSub => {
                        if(popSub.subject === row.Subject)
                        {
                            popSub.total--;
                        }                    
                    });
                    this.cringPopItems.forEach(popCringe => {
                        if(popCringe.cringeLevel === row.CringeLevel)
                        {
                            popCringe.total--;
                        }                    
                    });
                }                
            },
            highlightJoke(row){
                this.jokeDialog = {
                    Joke: row.Joke,
                    Subject: row.Subject,
                    CringeLevel: row.CringeLevel,
                    Popularity: row.Popularity,
                }
                this.dialog = true;
            },
            getJoke() {
                if(!this.isLoading)
                {
                    const max = Math.floor(this.items.length);
                    let randomJoke = this.items[Math.floor(Math.random() * (max - 0 + 1) + 0)];
                    this.currentDadJoke = randomJoke.Joke;
                }
            },                                   
        },
        computed: {
            fields () {
                if (!this.model) return []

                return Object.keys(this.model).map(key => {
                return {
                    key,
                    value: this.model[key] || 'n/a',
                }
                })
            },    
            headers() {
                var headerArr = [ 
                    {
                        text: "Joke",
                        value: "Joke",
                        justify: 'left',
                        style: 'background-color: black'                        
                    },
                    {
                        text: "Subject",
                        value: "Subject",
                        justify: 'left'
                    },
                    {
                        text: "Cringe Level",
                        value: "Cringe Level",
                        justify: 'left'
                    },
                    {
                        text: "Popularity",
                        value: "Popularity",
                        justify: 'left',
                        sortable: false
                    },
                    {
                        text: "Vote",
                        value: "Vote",
                        justify: 'left'
                    },
                ];
                if(!this.isLoading)
                {
                    headerArr = [];
                    this.content.meta['fields'].forEach(header => {
                            console.log(header);
                            var tempHeader = {
                                text: header,
                                align: 'start',
                                value: header
                            }                            
                            headerArr.push(tempHeader);                            
                        }                        
                    );                    
                    const popHeader = {
                        text: "Popularity",
                        value: 'popularity',
                        sortable: false
                    }
                    headerArr.push(popHeader);
                    const voteHeader = {
                        text: "Vote",
                        value: "Vote",
                        sortable: false
                    }
                    headerArr.push(voteHeader);
                    return headerArr;
                }
                
                return headerArr;
            },        
            items () {
                if(!this.isLoading)
                {
                    //return this.content.data;
                    return this.content.data.map(entry => ({
                        ...entry, Popularity: 0
                    }))                    
                }
                else 
                {
                    return [];
                }                
            },
            subjectPopItems () {
                if(!this.isLoading)
                {
                    const subjects = [...new Set(this.content.data.map(entry => entry.Subject))];
                    
                    let popSubjects = subjects.map(x => ({
                        subject: x,
                        total: 0
                    }));

                    // Get totals by subject
                    this.items.forEach(element => { 
                        popSubjects.forEach(popSub => {
                            if(popSub.subject == element.Subject)
                            {
                                popSub.total++;
                            }
                        });
                    });
              
                    return popSubjects;
                }
                return [];
            },
            cringPopItems () {
                if(!this.isLoading)
                {
                    const cringeLevel = [...new Set(this.content.data.map(entry => entry.CringeLevel))];
                    
                    let cringLevels = cringeLevel.map(x => ({
                        cringeLevel: x,
                        total: 0
                    }));

                    // Get totals by subject
                    this.items.forEach(element => { 
                        cringLevels.forEach(cringeLvl => {
                            if(cringeLvl.cringeLevel == element.CringeLevel)
                            {
                                cringeLvl.total++;
                            }
                        });
                    });
              
                    return cringLevels;
                }
                return [];
            }            
        },
        data(){
            return {
                file: '',
                content: [],
                currentDadJoke: "Joke Goes Here Okey Dokey",
                model: null,
                search: '',
                isLoading: true,
                dialog: false,
                jokeDialog: {
                    Joke: "",
                    Subject: "",
                    CringeLevel: "",
                    Popularity: "",
                },
                drawer: false,
                group: null,
                homeState: "display: block",
                analysisState: "display: none",                
            }
        },
        watch: {
            group () {
                this.drawer = false
            },            
        },
    }

    
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .navTitle:hover {
        background: #4FC3F7;
    }
    .navTitle:active {
        background: #00897B;
    }

    #jokeTable table td {
        font-size: 20px;
    }
    ::v-deep th {
        font-size: 25px !important; 
        text-align: left !important;        

    }
    
    .listStyle {
        font-size: 25px;
        border-bottom: 1px solid grey;
        padding-left: 10px;
        padding-right: 10px;        
    }
</style>
  