# Meal Attributes System Documentation

## Overview
The attribute system allows meals to have dynamic properties like taste, size, spiciness level, etc. Each attribute can have multiple values that customers can choose from.

## Database Schema

### Tables Structure

#### 1. `attributes` Table
Stores the main attribute definitions (e.g., "Taste", "Size", "Spice Level")

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| name_en | string | Attribute name in English |
| name_ar | string | Attribute name in Arabic |
| type | string | Input type: 'select', 'radio', 'checkbox' |
| is_required | boolean | Whether this attribute is mandatory |
| sort_order | integer | Display order |
| timestamps | - | Created/Updated timestamps |

**Example:**
```json
{
  "id": 1,
  "name_en": "Spice Level",
  "name_ar": "مستوى البهارات",
  "type": "select",
  "is_required": true,
  "sort_order": 1
}
```

#### 2. `attribute_values` Table
Stores the possible values for each attribute

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| attribute_id | foreignId | References attributes table |
| value_en | string | Value name in English |
| value_ar | string | Value name in Arabic |
| price_modifier | decimal(10,2) | Additional price (+/-) |
| sort_order | integer | Display order |
| timestamps | - | Created/Updated timestamps |

**Example:**
```json
{
  "id": 1,
  "attribute_id": 1,
  "value_en": "Mild",
  "value_ar": "خفيف",
  "price_modifier": 0.00,
  "sort_order": 1
}
```

#### 3. `meal_attributes` Table (Pivot)
Links meals with their selected attribute values

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Primary key |
| meal_id | foreignId | References meals table |
| attribute_id | foreignId | References attributes table |
| attribute_value_id | foreignId | References attribute_values table |
| timestamps | - | Created/Updated timestamps |
| **Unique** | - | (meal_id, attribute_id) - ensures one value per attribute per meal |

## Relationships

### Attribute Model
```php
// An attribute has many values
public function values()
{
    return $this->hasMany(AttributeValue::class)->orderBy('sort_order');
}

// An attribute belongs to many meals
public function meals()
{
    return $this->belongsToMany(Meal::class, 'meal_attributes')
        ->withPivot('attribute_value_id')
        ->withTimestamps();
}
```

### AttributeValue Model
```php
// A value belongs to an attribute
public function attribute()
{
    return $this->belongsTo(Attribute::class);
}

// A value belongs to many meals
public function meals()
{
    return $this->belongsToMany(Meal::class, 'meal_attributes')
        ->withPivot('attribute_id')
        ->withTimestamps();
}
```

### Meal Model
```php
// A meal can have many attributes
public function attributes()
{
    return $this->belongsToMany(Attribute::class, 'meal_attributes')
        ->withPivot('attribute_value_id')
        ->withTimestamps();
}

// A meal can have many attribute values
public function attributeValues()
{
    return $this->belongsToMany(AttributeValue::class, 'meal_attributes', 'meal_id', 'attribute_value_id')
        ->withPivot('attribute_id')
        ->withTimestamps();
}
```

## Usage Examples

### 1. Creating Attributes

```php
// Create "Spice Level" attribute
$spiceLevel = Attribute::create([
    'name_en' => 'Spice Level',
    'name_ar' => 'مستوى البهارات',
    'type' => 'select',
    'is_required' => true,
    'sort_order' => 1
]);

// Add values for the attribute
$spiceLevel->values()->createMany([
    ['value_en' => 'Mild', 'value_ar' => 'خفيف', 'price_modifier' => 0],
    ['value_en' => 'Medium', 'value_ar' => 'متوسط', 'price_modifier' => 0],
    ['value_en' => 'Hot', 'value_ar' => 'حار', 'price_modifier' => 1.00],
    ['value_en' => 'Extra Hot', 'value_ar' => 'حار جداً', 'price_modifier' => 2.00]
]);
```

### 2. Assigning Attributes to Meals

```php
// Attach attribute with specific value to a meal
$meal->attributes()->attach($attributeId, [
    'attribute_value_id' => $valueId
]);

// Or sync multiple attributes at once
$meal->attributes()->sync([
    $spiceLevelId => ['attribute_value_id' => $mildValueId],
    $sizeId => ['attribute_value_id' => $largeValueId]
]);
```

### 3. Retrieving Meal with Attributes

```php
// Eager load attributes with values
$meal = Meal::with(['attributes.values'])->find($mealId);

// Get meal's selected attribute values
$meal = Meal::with('attributeValues')->find($mealId);

// Calculate total price with modifiers
$basePrice = $meal->price;
$totalModifiers = $meal->attributeValues->sum('price_modifier');
$totalPrice = $basePrice + $totalModifiers;
```

## Frontend Integration

### MealDialog Component
The `MealDialog` component has been updated to include attribute selection:

**Props:**
```typescript
interface Props {
    open: boolean
    onClose: () => void
    categories: Category[]
    attributes?: Attribute[]  // Array of available attributes
    meal?: Meal
}
```

**Attribute Selection:**
- Displays all available attributes
- Shows required indicator (*)
- Supports `select` and `radio` input types
- Shows price modifiers (+/- amount)
- Bilingual support (English/Arabic)

### Data Submission
When submitting the meal form, attributes are sent as JSON:
```javascript
formData.append('attributes', JSON.stringify({
    1: 5,  // attribute_id: attribute_value_id
    2: 8
}))
```

## Backend Controller Example

```php
// Store/Update meal with attributes
public function store(Request $request)
{
    $meal = Meal::create($request->except('attributes'));
    
    // Parse and attach attributes
    $attributes = json_decode($request->attributes, true);
    foreach ($attributes as $attributeId => $valueId) {
        $meal->attributes()->attach($attributeId, [
            'attribute_value_id' => $valueId
        ]);
    }
    
    return redirect()->back();
}

public function update(Request $request, Meal $meal)
{
    $meal->update($request->except('attributes'));
    
    // Sync attributes
    $attributes = json_decode($request->attributes, true);
    $syncData = [];
    foreach ($attributes as $attributeId => $valueId) {
        $syncData[$attributeId] = ['attribute_value_id' => $valueId];
    }
    $meal->attributes()->sync($syncData);
    
    return redirect()->back();
}
```

## Use Cases

### 1. Restaurant Menu
- **Size Options:** Small, Medium, Large (price +0, +2, +4)
- **Spice Level:** Mild, Medium, Hot, Extra Hot
- **Extras:** Extra Cheese, Extra Sauce (price +1 each)

### 2. Coffee Shop
- **Size:** Tall, Grande, Venti (different prices)
- **Milk Type:** Regular, Soy, Almond, Oat (price varies)
- **Sweetness:** No Sugar, Less Sugar, Regular, Extra Sweet
- **Temperature:** Hot, Iced

### 3. Pizza Restaurant
- **Size:** Personal, Medium, Large, Family
- **Crust:** Thin, Regular, Thick
- **Toppings:** Multiple checkboxes with price modifiers

## Benefits

1. **Flexibility:** Add new attributes without code changes
2. **Dynamic Pricing:** Price modifiers for premium options
3. **Multilingual:** Full support for English and Arabic
4. **Type Safety:** TypeScript interfaces ensure type safety
5. **Clean Code:** Follows Laravel relationship patterns
6. **Scalable:** Can handle unlimited attributes per meal
7. **User Friendly:** Intuitive UI for both admin and customers

## Notes

- Each meal can only have ONE value per attribute (enforced by unique constraint)
- Attributes are optional by default unless `is_required` is true
- Price modifiers can be positive (add cost) or negative (discount)
- Sort order determines display sequence
- All CRUD operations cascade delete properly
