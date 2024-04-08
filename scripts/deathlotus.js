var items = [
    {name: 'Kraken Slayer', attackDamage: 40, attackSpeed: 35, icon: 'https://raw.githubusercontent.com/MeguminBOT/katarina-death-lotus-damage-calculator/main/items/krakenslayer.png'},
    {name: 'Blade of the Ruined King', attackDamage: 40, attackSpeed: 25, icon: 'https://raw.githubusercontent.com/MeguminBOT/katarina-death-lotus-damage-calculator/main/items/botrk.png'},
    // Add more items here...
];

function generateItemCheckboxes() {
    var container = document.getElementById('items');
    items.forEach(function(item, index) {
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = 'item' + index;
        checkbox.onclick = function() {
            updateBonusValues();
        };

        var label = document.createElement('label');
        label.htmlFor = 'item' + index;
        label.textContent = item.name;

        var icon = document.createElement('img');
        icon.src = item.icon;
        icon.alt = item.name + ' icon';
        icon.className = 'item-icon'; // You can style the icon using this class

        container.appendChild(icon);
        container.appendChild(checkbox);
        container.appendChild(label);
        container.appendChild(document.createElement('br'));
    });
}

function updateBonusValues() {
    var bonusAd = 0;
    var bonusAs = 0;

    items.forEach(function(item, index) {
        var checkbox = document.getElementById('item' + index);
        if (checkbox.checked) {
            bonusAd += item.attackDamage;
            bonusAs += item.attackSpeed;
        }
    });

    document.getElementById('bonus_ad').value = bonusAd;
    document.getElementById('bonus_as').value = bonusAs;
}

window.onload = function() {
    generateItemCheckboxes();
};

function calculateAndDisplay() {
    var base_attack_speed = 0.658;
    var attack_speed_ratio = 0.658;
    var bonus_ad = parseFloat(document.getElementById('bonus_ad').value);
    var bonus_as = parseFloat(document.getElementById('bonus_as').value.replace('%', ''));

    var total_attack_speed = calculateTotalAttackSpeed(base_attack_speed, attack_speed_ratio, bonus_as);
    var total_damage = calculateDeathLotusDamage(bonus_ad, bonus_as);

    var ability_duration = 2.5;
    var ability_interval = 0.166;
    var hits = ability_duration / ability_interval;

    var total_damage_sum = total_damage * hits;
    var total_damage_ad_plus_10 = calculateDeathLotusDamage(bonus_ad + 10, bonus_as);
    var total_damage_sum_ad_plus_10 = total_damage_ad_plus_10 * hits;
    var total_damage_as_plus_10 = calculateDeathLotusDamage(bonus_ad, bonus_as + 12);
    var total_damage_sum_as_plus_10 = total_damage_as_plus_10 * hits;

    document.getElementById('result').innerText = 
        'Total damage: ' + total_damage_sum + '\n' +
        'Total damage with 10 more bonus AD: ' + total_damage_sum_ad_plus_10 + '\n' +
        'Total damage with 12% more attack speed: ' + total_damage_sum_as_plus_10;
}

function calculateTotalAttackSpeed(base_attack_speed, attack_speed_ratio, bonus_as) {
    var bonus_as_multiplier = bonus_as / 100;
    var modified_value = bonus_as_multiplier * attack_speed_ratio;
    var total_attack_speed = base_attack_speed + modified_value;
    return total_attack_speed;
}

function calculateDeathLotusDamage(bonus_ad, bonus_as) {
    var damage_multiplier = 0.16 * (1 + 3.125 * bonus_as / 100);
    var total_damage = damage_multiplier * bonus_ad;
    return total_damage;
}


