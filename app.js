/// Created a new Vue app
const app = Vue.createApp({
    /// Defined the data for the app
    data() {
        return {
            myFullName: "Harprit Wadekar",
            myStudentID: "1196416",
            defaultLocation: "London, Ontario, Canada",
            wordInput: "",
            user: {
                fullName: "",
                age: null,
                profilePic: ""
            },
            LondonweatherForm: {
                d_city: "London",
                d_province: "Ontario",
                d_country: "Canada"
            },
            Londonweather: {
                temp: "",
                wind: "",
                description: ""
            },
            weatherForm: {
                city: "",
                province: "",
                country: ""
            },
            weather: {
                temp: "",
                wind: "",
                description: ""
            },
            definition: {
                word: "",
                phonetic: "",
                meaning: ""
            }
        };
    },
     /// Defined the methods for the app
    methods: {
        fetchUser() {
            fetch("https://comp6062.liamstewart.ca/random-user-profile")
              .then(response => response.json())
              .then(data => {
                this.user.fullName = `${data.first_name} ${data.last_name}`;
                this.user.age = data.age;
                this.user.profilePic = data.profile_picture;
              });
          },
        fetchLondonWeather(){
            const { d_city, d_province, d_country } = this.LondonweatherForm;
            const url1 = `http://comp6062.liamstewart.ca/weather-information?city=${d_city}&province=${d_province}&country=${d_country}`;

            fetch(url1)
                .then(res => res.json())
                .then(data => {
                    this.Londonweather.temp = data.temperature;
                    this.Londonweather.wind = data.wind_speed;
                    this.Londonweather.description = data.weather_description;
                });
        },

        fetchWeather() {
            const { city, province, country } = this.weatherForm;
            const url = `http://comp6062.liamstewart.ca/weather-information?city=${city}&province=${province}&country=${country}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    this.weather.temp = data.temperature;
                    this.weather.wind = data.wind_speed;
                    this.weather.description = data.weather_description;
                });
        },

        fetchDefinition() {
            console.log(`Fetching definition for: ${this.wordInput}`);
            const url = `https://comp6062.liamstewart.ca/define?word=${this.wordInput}`;

            fetch(url)
                .then(res => res.json())
                .then(data => {
                    const first = data[0];
                    this.definition.word = first.word;
                    this.definition.phonetic = first.phonetic;
                    this.definition.meaning = first.definition;
                });
        }
    }
    ,mounted() {
        this.fetchUser();
        this.fetchLondonWeather();
        this.fetchWeather();
        this.fetchDefinition();
    }
});
/// Mount the app to the #app element
app.mount('#app');